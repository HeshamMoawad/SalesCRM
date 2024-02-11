import re 
from django.core.exceptions import ValidationError

SAOUDI_NUMBER_REGEX = r"^[\+]?(?:966|0)(5\d{8})$"


def validate_number(number:str):
    resault = re.match(SAOUDI_NUMBER_REGEX,number)
    if resault :
        return f"+966{resault.group(1)}"
    else :
        raise ValidationError("""Number Doesn't match +9665XXXXXXXX or 9665XXXXXXXX or 05XXXXXXXX""")
