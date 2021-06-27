class ApportionSeriesCombinationError(Exception):
    """Exception raised when the combination of apportionment data sets is unexpected. 
    There should only be two configurations: Enbridge and other

    Attributes:
        company -- input company which caused the error
    """

    def __init__(self, company, message="Unpredictable data combination for: "):
        self.company = company
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'{self.message} {self.company}'


class IdError(Exception):
    """Exception raised when the pre-set trade/product id's are not applied
    to traffic data, likely because of a new product in the database.

    Attributes:
        trade -- input column category that doesnt have an id
    """

    def __init__(self, trade, message="No id for: "):
        self.trade = trade
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'{self.message} {self.trade}'


class IdLengthError(Exception):
    """Exception raised after id's are applied and there
    is an entry longer than the longest id.
    This indicates that at least one id was applied incorrectly.

    Attributes:
        colVal -- input column value that doesnt have an id
    """

    def __init__(self, colVal, message="This column value doesnt have an id: "):
        self.colVal = colVal
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'{self.message} {self.colVal}'