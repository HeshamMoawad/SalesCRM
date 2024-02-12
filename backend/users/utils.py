
def get_fieldsets(name:str):
    return (
        (f"Login Details ({name})", {
            "fields": (
                "username",
                "_password"
            ),
        }),
        ( "Other Details" ,
            {
                "fields" : (
                    "first_name" ,
                )
            }
        )
    )
