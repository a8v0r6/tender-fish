"""

Scrapes live tenders from IREPS (Indian Railway E-Procurement System)
using the TinyFish web agent API.

Flow:
  1. Ask user for their registered IREPS phone number
  2. TinyFish navigates to IREPS and enters the phone number to trigger OTP
  3. Ask user to enter the OTP received on their phone
  4. TinyFish enters the OTP, logs in, and scrapes available tenders
  5. Print results as formatted JSON

"""

import json
import sys
import time
from getpass import getpass

from dotenv import load_dotenv
from tinyfish import TinyFish

# ── Load environment ──────────────────────────────────────────────────────────

load_dotenv()  # reads .env file from the current directory

IREPS_URL = "https://www.ireps.gov.in/epsn/guestLogin.do"

# ── Helpers ───────────────────────────────────────────────────────────────────

def print_banner():
    print("\n" + "═" * 60)
    print("  🐟  TenderFish × IREPS Scraper")
    print("  Indian Railway E-Procurement System")
    print("═" * 60 + "\n")


def print_step(n: int, label: str):
    print(f"\n  Step {n}  ──  {label}")
    print("  " + "─" * 50)


def print_progress(event):
    """Print streaming progress events from TinyFish in a readable way."""
    event_type = getattr(event, "type", None)

    if event_type == "STARTED":
        run_id = getattr(event, "run_id", "")
        print(f"  ▶  Run started  [{run_id[:8]}...]")

    elif event_type == "STREAMING_URL":
        url = getattr(event, "streaming_url", "")
        print(f"  🌐  Live preview: {url}")

    elif event_type == "PROGRESS":
        purpose = getattr(event, "purpose", "")
        if purpose:
            print(f"  •  {purpose}")

    elif event_type == "COMPLETE":
        status = getattr(event, "status", "")
        if status == "COMPLETED":
            print("  ✓  Completed\n")
        else:
            print(f"  ✗  Ended with status: {status}\n")


def format_tender(tender: dict, index: int) -> str:
    """Pretty-print a single tender result."""
    lines = [
        f"\n  ┌─ Tender #{index + 1} {'─' * 40}",
        f"  │  Title      : {tender.get('title', 'N/A')}",
        f"  │  Tender No  : {tender.get('tender_no', tender.get('id', 'N/A'))}",
        f"  │  Railway    : {tender.get('railway', tender.get('department', 'N/A'))}",
        f"  │  Value      : {tender.get('value', tender.get('estimated_value', 'N/A'))}",
        f"  │  Deadline   : {tender.get('deadline', tender.get('closing_date', 'N/A'))}",
        f"  │  Category   : {tender.get('category', tender.get('type', 'N/A'))}",
        f"  └{'─' * 50}",
    ]
    return "\n".join(lines)


# ── Step 1 — Collect phone number from user ───────────────────────────────────

def get_phone_number() -> str:
    print_step(1, "Phone Number")
    print("  Enter your IREPS-registered mobile number.")
    print("  This will be used to log in and fetch tenders.\n")

    while True:
        phone = input("  Phone number (10 digits): ").strip()
        # Remove common prefixes (+91, 91, 0) but keep exactly 10 digits
        digits = phone
        if digits.startswith("+91"):
            digits = digits[3:]
        elif digits.startswith("91"):
            digits = digits[2:]
        elif digits.startswith("0"):
            digits = digits[1:]
        
        if len(digits) == 10 and digits.isdigit():
            print(f"\n  ✓  Using number: +91 {digits}")
            return digits
        print("  ✗  Invalid number. Please enter a 10-digit Indian mobile number.\n")


# ── Step 2 — TinyFish navigates IREPS and enters phone ───────────────────────

def trigger_otp(client: TinyFish, phone: str) -> str | None:
    """
    Navigate to IREPS, find the login form, enter the phone number,
    and click the OTP button. Returns (success_bool, streaming_url).
    """
    print_step(2, "Navigating to IREPS & Triggering OTP")
    print("  TinyFish is opening IREPS and entering your phone number...\n")

    streaming_url = None

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

    with client.agent.stream(
        url=IREPS_URL,
        goal=goal,
        browser_profile="stealth",  # IREPS has bot protection
    ) as stream:
        for event in stream:
            try:
                print_progress(event)
            except Exception as e:
                print(f"  [Debug] print_progress error: {e}")

            # Capture live preview URL so user can watch in browser
            if getattr(event, "type", None) == "STREAMING_URL":
                streaming_url = getattr(event, "streaming_url", None)

            if getattr(event, "type", None) == "COMPLETE":
                try:
                    # Convert event to string and parse as JSON
                    event_str = str(event)
                    result = {}
                    try:
                        # Try to extract JSON from the event string
                        if "{" in event_str:
                            json_part = event_str[event_str.find("{"):]
                            result = json.loads(json_part)
                    except (json.JSONDecodeError, ValueError):
                        result = {}

                    if result.get("otp_triggered"):
                        print("  ✓  OTP successfully triggered on IREPS")
                    else:
                        err = result.get("error", "Unknown error")
                        print(f"  ✗  Could not trigger OTP: {err}")
                        return False, streaming_url
                except Exception as e:
                    print(f"  [Debug] Error processing COMPLETE event: {e}")
                    import traceback
                    traceback.print_exc()
                    raise

    return True, streaming_url


# ── Step 3 — Collect OTP from user ───────────────────────────────────────────

def get_otp() -> str:
    print_step(3, "Enter OTP")
    print("  Check your phone for the OTP sent by IREPS.")
    print("  You have 10 minutes before it expires.\n")

    while True:
        # Use getpass so OTP isn't visible in terminal (optional — remove if you prefer visible input)
        otp = input("  Enter OTP (default: 555498): ").strip()
        if not otp:
            otp = "555498"
            
        if len(otp) == 6 and otp.isdigit():
            print(f"\n  ✓  OTP received: {'*' * 6}")
            return otp
        elif len(otp) in (4, 5, 6) and otp.isdigit():
            # Some portals use 4 or 5 digit OTPs
            print(f"\n  ✓  OTP received")
            return otp
        print(f"  ✗  Invalid OTP (got '{otp}'). Please enter the exact OTP from your SMS.\n")


# ── Step 4 — TinyFish enters OTP and scrapes tenders ─────────────────────────

def login_and_scrape(client: TinyFish, phone: str, otp: str) -> list[dict]:
    """
    Enter the OTP on IREPS, complete login, then scrape the tender listings.
    Returns a list of tender dicts.
    """
    print_step(4, "Logging In & Scraping Tenders")
    print("  TinyFish is entering your OTP and fetching live tenders...\n")

    goal = f"""
    Navigate to the IREPS guest login page at {IREPS_URL}.
    Note: You are starting with a fresh browser state on the "Authenticate Yourself" form.

    1. Fill exactly these fields on the form:
       a) "Mobile Number *" -> Enter: {phone}
       b) "Enter Verification Code *" -> Solve the captcha image and enter the text.
       c) "Please Enter Today's OTP *" -> Enter: {otp}
    
    2. WARNING: DO NOT click "Get OTP". You already have the OTP.
    
    3. Click the blue "Proceed" button at the bottom of the form to log in.
    
    4. Wait for the dashboard to load. Navigate back to the active tenders list if needed.
    
    4. Navigate to the tender section. Look for links like:
       "Tenders", "Active Tenders", "Open Tenders", "e-Tender",
       or any section showing procurement/purchase tenders.
    
    5. Extract all visible tenders. For each tender collect:
       - title or description of the tender
       - tender_no (unique identifier)
       - railway (the Railway zone or department that issued it, e.g. "Western Railway")
       - value or estimated_value (in INR — include unit like "Lakhs" or "Crore")
       - deadline or closing_date (submission deadline)
       - category (e.g. "Works", "Stores", "Services")
       - status (e.g. "Open", "Active")
    
    6. Respond ONLY with valid JSON in this exact format:
       {{
         "login_success": true,
         "tenders_found": <number>,
         "tenders": [
           {{
             "title": "...",
             "tender_no": "...",
             "railway": "...",
             "value": "...",
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

    with client.agent.stream(
        url=IREPS_URL,
        goal=goal,
        browser_profile="stealth",
    ) as stream:
        for event in stream:
            print_progress(event)

            if getattr(event, "type", None) == "COMPLETE":
                # Convert event to string and parse as JSON
                event_str = str(event)
                result = {}
                try:
                    # Try to extract JSON from the event string
                    if "{" in event_str:
                        json_part = event_str[event_str.find("{"):]
                        result = json.loads(json_part)
                except (json.JSONDecodeError, ValueError):
                    result = {}

                if not result.get("login_success"):
                    err = result.get("error", "Unknown login failure")
                    print(f"  ✗  Login failed: {err}")
                    return []

                tenders = result.get("tenders", [])
                count = result.get("tenders_found", len(tenders))
                print(f"  ✓  Login successful — found {count} tender(s)")
                return tenders

    return []


# ── Step 5 — Display results ──────────────────────────────────────────────────

def display_results(tenders: list[dict]):
    print_step(5, "Results")

    if not tenders:
        print("  No tenders found. This could mean:")
        print("  • No active tenders are currently open on IREPS")
        print("  • The login session expired before scraping completed")
        print("  • IREPS changed its page structure\n")
        return

    print(f"  Found {len(tenders)} tender(s) on IREPS:\n")
    for i, tender in enumerate(tenders):
        print(format_tender(tender, i))

    # Also save to JSON file
    output_file = "ireps_tenders.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(
            {
                "scraped_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
                "source": "IREPS",
                "total": len(tenders),
                "tenders": tenders,
            },
            f,
            indent=2,
            ensure_ascii=False,
        )
    print(f"\n  💾  Full results saved to: {output_file}\n")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print_banner()

    # Initialise TinyFish client — reads TINYFISH_API_KEY from environment
    client = TinyFish()

    # Step 1: Get phone number from user
    phone = get_phone_number()

    # Step 2: Get OTP from user (defaults to 555498)
    otp = get_otp()

    # Step 3: TinyFish completes login and scrapes tenders in one go
    tenders = login_and_scrape(client, phone, otp)

    # Step 4: Display and save results
    display_results(tenders)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n  Cancelled by user.\n")
        sys.exit(0)
    except Exception as e:
        import traceback
        print(f"\n  ✗  Unexpected error: {e}")
        traceback.print_exc()
        sys.exit(1)