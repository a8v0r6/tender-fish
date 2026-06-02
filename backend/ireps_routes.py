from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from tinyfish import TinyFish
import json
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/ireps", tags=["IREPS Scraping"])

IREPS_URL = "https://www.ireps.gov.in/epsn/guestLogin.do"

# Pydantic models
class TriggerOtpRequest(BaseModel):
    phone: str

class SubmitOtpRequest(BaseModel):
    phone: str
    otp: str

@router.post("/trigger-otp")
def trigger_otp_endpoint(req: TriggerOtpRequest):
    """
    Start the TinyFish session to open IREPS and trigger an OTP to the given phone number.
    Returns the streaming_url so the frontend can display it, and the session ID based on phone.
    """
    phone = req.phone.strip()
    # Normalize phone somewhat if needed
    if phone.startswith("+91"):
        phone = phone[3:]
    elif phone.startswith("91"):
        phone = phone[2:]
    elif phone.startswith("0"):
        phone = phone[1:]
        
    client = TinyFish()
    streaming_url = None
    profile_name = f"stealth_{phone}"

    goal = f"""
    Navigate to the IREPS login page at {IREPS_URL}.
    
    1. If not already on the form, click the guest login / vendor login link.
    
    2. On the "Authenticate Yourself" form, perform exactly these actions:
       a) Find the "Mobile Number *" field and enter: {phone}
       b) Solve the captcha image and enter the text into the "Enter Verification Code *" field.
       c) Click the "Get OTP" button located next to the verification field.
    
    3. CRITICAL: The portal does not show a distinct success toast message. 
       Do NOT wait for a success banner. Do NOT click "Get OTP" again.
       Once you click the "Get OTP" button, assume the SMS was sent.

    4. Respond with JSON:
       {{
         "otp_triggered": true,
         "message": "OTP is ready for {phone}",
         "otp_field_visible": true
       }}
    
    If you cannot find the login form, or if there is a blocking error (other than rate limits), respond with:
       {{ "otp_triggered": false, "error": "describe what you found instead" }}
    """
    
    try:
        with client.agent.stream(
            url=IREPS_URL,
            goal=goal,
            browser_profile="stealth",
        ) as stream:
            for event in stream:
                # Capture streaming URL
                if getattr(event, "type", None) == "STREAMING_URL":
                    streaming_url = getattr(event, "streaming_url", None)
                    print(f"\\n\\n>>> AGENT LIVE STREAM: {streaming_url} <<<\\n\\n")
                    logger.info(f"Streaming URL: {streaming_url}")
                
                if getattr(event, "type", None) == "COMPLETE":
                    event_str = str(event)
                    result = {}
                    try:
                        if "{" in event_str:
                            json_part = event_str[event_str.find("{"):]
                            result = json.loads(json_part)
                    except (json.JSONDecodeError, ValueError):
                        result = {}
                    
                    if not result.get("otp_triggered"):
                        err = result.get("error", "Unknown error")
                        raise HTTPException(status_code=400, detail=f"Could not trigger OTP: {err}")
    except Exception as e:
        logger.error(f"Error in trigger-otp: {e}")
        # if it's already an HTTPException, raise it directly
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

    return {"success": True, "streaming_url": streaming_url, "message": f"OTP successfully triggered for phone {phone}"}


@router.post("/submit-otp")
def submit_otp_endpoint(req: SubmitOtpRequest):
    """
    Resume the TinyFish session using the same profile, enter the OTP, and scrape tenders.
    """
    phone = req.phone.strip()
    if phone.startswith("+91"):
        phone = phone[3:]
    elif phone.startswith("91"):
        phone = phone[2:]
    elif phone.startswith("0"):
        phone = phone[1:]
        
    client = TinyFish()
    profile_name = f"stealth_{phone}"

    goal = f"""
    Navigate to the IREPS guest login page at {IREPS_URL}.
    Note: You are starting with a fresh browser state on the "Authenticate Yourself" form.

    1. Fill exactly these fields on the form:
       a) "Mobile Number *" -> Enter: {phone}
       b) "Enter Verification Code *" -> Solve the captcha image and enter the text.
       c) "Please Enter Today's OTP *" -> Enter: {req.otp}
    
    2. WARNING: DO NOT click "Get OTP". You already have the OTP.
    
    3. Click the blue "Proceed" button at the bottom of the form to log in.
    
    4. Wait for the dashboard to load. Navigate back to the active tenders list if needed.
    
    4. Navigate to the tender section. Look for links like:
       "Tenders", "Active Tenders", "Open Tenders", "e-Tender",
       or any section showing procurement/purchase tenders.
    
    5. Extract all visible tenders. For each tender collect:
       - id or tender_no (unique identifier, e.g. "TDS-1234") 
       - title or description of the tender
       - railway or department (e.g. "Western Railway")
       - estimated_value or value (in INR — include unit like "Lakhs" or "Crore")
       - deadline or closing_date
       - category (e.g. "Works", "Stores", "Services")
       - status (e.g. "Open", "Active")
    
    6. Respond ONLY with valid JSON in this exact format. If 'id' is extracted, ensure it maps to 'id'. Keep property names consistent so frontend can map them:
       {{
         "login_success": true,
         "tenders_found": <number>,
         "tenders": [
           {{
             "id": "...",
             "title": "...",
             "department": "...",
             "estimated_value": "...",
             "deadline": "...",
             "category": "...",
             "status": "..."
           }}
         ]
       }}
    
    If login fails (wrong OTP, session expired, etc), respond with:
       {{ "login_success": false, "error": "reason" }}
    
    If login works but no tenders are visible, respond with:
       {{ "login_success": true, "tenders_found": 0, "tenders": [] }}
    """

    try:
        with client.agent.stream(
            url=IREPS_URL,
            goal=goal,
            browser_profile="stealth",
        ) as stream:
            for event in stream:
                if getattr(event, "type", None) == "COMPLETE":
                    event_str = str(event)
                    result = {}
                    try:
                        if "{" in event_str:
                            json_part = event_str[event_str.find("{"):]
                            result = json.loads(json_part)
                    except (json.JSONDecodeError, ValueError):
                        result = {}
                        
                    if not result.get("login_success"):
                        err = result.get("error", "Unknown login failure")
                        raise HTTPException(status_code=400, detail=f"Login failed: {err}")

                    tenders = result.get("tenders", [])
                    return {"success": True, "tenders": tenders}

    except Exception as e:
        logger.error(f"Error in submit-otp: {e}")
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))
        
    return {"success": False, "error": "No completion event received from agent"}
