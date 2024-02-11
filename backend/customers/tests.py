from django.test import TestCase
from utils import validate_number

class UtilsTestCase(TestCase):
    def test_valid_number_format(self):
        valid_numbers = [
            "+966500000000",
            "966500000000",
            "0500000000"
        ]
        for number in valid_numbers:
            with self.subTest(number=number):
                self.assertEqual(validate_number(number), "500000000")

    def test_invalid_number_format(self):
        invalid_numbers = [
            "+966500",  # Less than 10 digits
            "9665000000000",  # More than 10 digits
            "500000000",  # Missing country code
            "05000000000",  # Additional digit
            "+966600000000"  # Wrong country code
        ]
        for number in invalid_numbers:
            with self.subTest(number=number):
                with self.assertRaises(ValueError):
                    validate_number(number)
