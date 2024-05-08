
function FFormula() {
    this.stkOpt = [];
    this.bstkOpt = [];
    this.m_sResult = "";
    this.m_sError = "";
    this.strarr = [];
    this.Tstrarr = [];
    this.VarList = [];
    this.m_iIndex = 0;
    this.m_iRow = 0;
    this.m_objTag = null;
    this.m_bCallbacksForAllVars = false;
    this.m_CalType = 0;
    this.fnValueNeeded = "";

    this.getDoubleMaxValue = function () {
        return (1.7976931348623157E+308);
    },

    this.getEmptyVariableObject = function () {
        var obj = {};

        obj.strVar = "";
        obj.dVal = 0;

        return (obj);
    },

    this.getEmptyVariableParObject = function () {
        var obj = {};

        obj.strVar = "";
        obj.arrParams = [];

        return (obj);
    },

    this.clearStackOpt = function () {
        this.stkOpt = [];
    },

    this.pushStackOptValue = function (value) {
        this.stkOpt.push(value);
    },

    this.peekStackOptValue = function () {
        var value = null;

        value = this.stkOpt[this.stkOpt.length - 1];

        return (value);
    },

    this.popStackOptValue = function () {
        var value = null;

        value = this.stkOpt[this.stkOpt.length - 1];
        this.stkOpt.splice(this.stkOpt.length - 1, 1);

        return (value);
    },

    this.getStackOptCount = function() {
        return(this.stkOpt.length);
    },

    this.init = function (CalendarType) {
        this.stkOpt = [];
        this.bstkOpt = [];
        this.m_sResult = "";
        this.m_sError = "";
        this.strarr = [];
        this.Tstrarr = [];
        this.VarList = [];
        this.m_iIndex = 0;
        this.m_iRow = 0;
        this.m_objTag = null;
        this.m_bCallbacksForAllVars = false;
        this.m_CalType = CalendarType;
        this.fnValueNeeded = "";
    },

    this.getRowIndex = function () {
        return (this.m_iRow);
    },

    this.setRowIndex = function (value) {
        this.m_iRow = value;
    },

    this.getTag = function () {
        return (this.m_objTag);
    },

    this.setTag = function (value) {
        this.m_objTag = value;
    },

    this.getConditionalOperatorPrecedence = function (sValue) {
        var result = 0;

        if (sValue == "&&") {
            result = 2;
        }
        else if (sValue == "||") {
            result = 1;
        }

        return (result);
    },

    this.TempResultForBoolean = function (b1, b2, sOpt) {
        var result = false;

        if (sOpt == "&&") {
            result = (b1 && b2);
        }
        else if (sOpt == "||") {
            result = (b1 || b2);
        }

        return (result);
    },

    this.TestString = function (sTemp) {
        var i = 0, j = 0, k = 0;

        try {
            i = sTemp.length;
        }
        catch (err) {
            this.m_sError = err.message;

            return (false);
        }

        for (i = 0; i < sTemp.length; i++) {
            switch (sTemp.charAt(i)) {
                case '(':
                    j++;
                    break;
                case ')':
                    k++;
                    break;
                default:
                    break;
            }
        }

        if (j == k) {
            return true;
        }

        return (false);
    },

    this.TTernaryTempResult = function (sInfix) {
        var sTemp = "";
        var sTempRes = "";
        var i = 0;
        var j = 0;
        var iCount = 0;

        //sInfix = sInfix.replace(" ", ""); // replacing space wth empty
        sInfix = sInfix.replace(/\s+/g, ''); // replacing space wth empty

        for (i = 0; i < sInfix.length; i++) {
            switch (sInfix.charAt(i)) {
                case '('://open bracket
                    sTempRes = "";
                    for (j = i; ; j++)//add all the chars till close bracket
                    {
                        sTempRes += sInfix[j];
                        i++;

                        if (sInfix.charAt(j) == '(')
                        {
                            ++iCount;
                        }

                        if (sInfix.charAt(j) == ')') {
                            --iCount;

                            if (iCount == 0) {
                                i--;
                                j++;
                                break;
                            }
                        }
                    }




                    //for (j = i; sInfix[j] != ')'; j++)//add all the chars till close bracket
                    //{
                    //    sTempRes += sInfix[j];
                    //    i++;
                    //}
                    //sTempRes += sInfix[i];

                    if (FCommon.String.includes(sTempRes, "?"))//resulting string is also a ternary eqn
                    {
                        if (FCommon.String.includes(sTempRes, ":"))//check for double colon (is a valid terneqn)
                        {
                            sTemp += this.TernaryTempResult(sTempRes);//calculate the tern eqn
                        }
                        else {
                            return ("NaN");
                        }
                    }
                    else if (FCommon.String.includes(sTempRes, ">") || FCommon.String.includes(sTempRes, "<")
                        || FCommon.String.includes(sTempRes, "&&") || FCommon.String.includes(sTempRes, "||")
                        || FCommon.String.includes(sTempRes, "!=") || FCommon.String.includes(sTempRes, "=="))//check for conditional opts
                    {
                        sTemp += sTempRes;
                    }
                    else//is a unary eqn
                    {
                        sTempRes = this.UnaryResult(this.NormString(sTempRes)).toString();//unary result
                        if (sTempRes == "" || sTempRes == "NaN") {
                            return ("NaN");
                        }
                        sTemp += sTempRes;//add the resulting string(replacing from '(' to ')')
                    }
                    break;

                default:
                    sTemp += sInfix[i];//add char
                    break;
            }
        }
        sTemp = this.NormString(sTemp);//normalizing string

        if (FCommon.String.includes(sTemp, "?"))//is a tern eqn
        {
            if (FCommon.String.includes(sTemp, ":"))//should contain :
            {
                sTemp = this.TernaryTempResult(sTemp);
            }
            else {
                return ("NaN");
            }
        }
        else {
            sTemp = this.UnaryResult(sTemp).toString();//unary result
            if (sTemp == "" || sTemp == "NaN") {
                return ("NaN");
            }
        }

        return (sTemp);
    },

    this.TernaryTempResult = function (sInfix) {
        var sTemp = "";
        var stkTemp = [];
        var iCounter = 0;

        //sInfix = sInfix.replace(" ", "");
        sInfix = sInfix.replace(/\s+/g, '');
        for (iCounter = 0; iCounter < sInfix.length; iCounter++) {
            switch (sInfix.charAt(iCounter)) {
                case '?':
                case ':':
                    sTemp = this.NormString(sTemp);//normalizing the string & push into stack
                    stkTemp.push(sTemp);
                    sTemp = "";
                    break;

                default:
                    sTemp += sInfix[iCounter];
                    break;
            }
        }

        stkTemp.push(this.NormString(sTemp));//resulted string is pushed to stack

        while (stkTemp.length != 1)//check stack upto its count becomes 1
        {
            var str1 = "";
            var res1 = "";
            var res2 = "";

            res2 = stkTemp[stkTemp.length - 1]; // 2nd result
            stkTemp.splice(stkTemp.length - 1, 1);

            res1 = stkTemp[stkTemp.length - 1]; // first result
            stkTemp.splice(stkTemp.length - 1, 1);

            str1 = stkTemp[stkTemp.length - 1]; // eqn
            stkTemp.splice(stkTemp.length - 1, 1);

            str1 = this.TernaryResult(str1, res1, res2);//get result
            stkTemp.push(str1);//push the result  back to stock
        }

        sTemp = stkTemp[stkTemp.length - 1]; // final result

        return (sTemp);
    },

    this.TernaryPostfix = function (sInfix) {
        var sPostfix = "";
        var Sct = "";
        var iCounter = 0;

        this.clearStackOpt();
        sInfix = "(" + sInfix + ")";

        //this.Tstrarr = sInfix.Split(new Char[] { '|', '&' });//split the string
        //this.Tstrarr = sInfix.split(/\||&/);
        this.Tstrarr = FCommon.String.split(sInfix, "|&");
        //sInfix = sInfix.replace(" ", "");
        sInfix = sInfix.replace(/\s+/g, '');

        if (sInfix.charAt(1) == '*' || sInfix.charAt(1) == '/') {
            return ("");
        }

        for (iCounter = 0; iCounter < sInfix.length; iCounter++) {
            if (sInfix.charAt(iCounter) == '&' || sInfix.charAt(iCounter) == '|')//check char
            {
                var Temp = "";
                Sct = "";

                if (this.getStackOptCount() == 0)//check stock
                {
                    Sct += sInfix[iCounter];
                    Sct += sInfix[iCounter + 1];
                    this.pushStackOptValue(Sct);//push to stock
                }
                else {
                    while (this.getStackOptCount() >= 1)//check stock count
                    {
                        try {
                            Sct = this.peekStackOptValue(); //temporarily popping the value from stack
                        }
                        catch (err) {
                            this.m_sError = err.message;
                            return ("");
                        }

                        Temp = sInfix[iCounter];//temp string
                        Temp += sInfix[iCounter + 1];

                        try {
                            Sct = this.popStackOptValue();
                        }
                        catch (err) {
                            this.m_sError = err.message;
                            return ("");
                        }
                        sPostfix += Sct;
                    }

                    this.pushStackOptValue(Temp); // push to stock
                }
                iCounter++;
            }
            else {
                if (sInfix.charAt(iCounter) != ' ') {
                    sPostfix += sInfix[iCounter];
                }
            }
        }

        try {
            if (this.getStackOptCount() > 0) {
                Sct = this.popStackOptValue(); //pop the last value from stack
                sPostfix += Sct;
            }
        }
        catch (err) {
            this.m_sError = err.message;
        }

        if (this.getStackOptCount() != 0) {
            return ("");
        }

        return (sPostfix);
    },

    this.TernaryResult = function (sInfix, res1, res2) {
        var temp = "";
        var bstrResult = "";
        var b1 = false;
        var b2 = false;
        var i = 0;
        var j = 0;

        this.bstkOpt = [];
        bstrResult = this.TernaryPostfix(sInfix);//postfix the ternary eqn
        if (FCommon.String.isNullOrEmpty(bstrResult) == true) {
            return ("NaN");
        }

        if (bstrResult == "NaN") {
            return ("NaN");
        }

        for (i = 0; i < bstrResult.length; i++) {
            //making equation
            if (bstrResult.charAt(i) != ' ')//check for space
            {
                temp += bstrResult[i];
            }

            for (; (j < this.Tstrarr.length - 1) && (this.Tstrarr[j] == "" || this.Tstrarr[j] == " ") ; j++);//move to next valid charecter(which is not space)
            if (j < this.Tstrarr.length)//splited eqn length
            {
                if (temp == this.Tstrarr[j])//splitted eqn equla to temp eqn
                {
                    temp = this.NormString(temp);//normalizing string
                    temp = this.TempResult(temp);//result of the equation
                    this.bstkOpt.push(temp);//push the result to stock
                    temp = "";
                    j++;
                }
            }

            if (temp == "&&" || temp == "||")//check conditional operator occurs
            {
                b1 = FConvert.toBoolean(this.bstkOpt[this.bstkOpt.length - 1]);//pop the second result
                this.bstkOpt.splice(this.bstkOpt.length - 1, 1);

                b2 = FConvert.toBoolean(this.bstkOpt[this.bstkOpt.length - 1]);//pop the first result
                this.bstkOpt.splice(this.bstkOpt.length - 1, 1);

                b1 = this.TempResultForBoolean(b1, b2, temp);//conditional result
                this.bstkOpt.push(b1);//push the result back to stock
                temp = "";
            }
        }

        b1 = FConvert.toBoolean(this.bstkOpt[this.bstkOpt.length - 1]);// final result
        this.bstkOpt.splice(this.bstkOpt.length - 1, 1);

        if (b1) {
            return (this.UnaryResult(res1));//first unary eqn result
        }
        else {
            return (this.UnaryResult(res2));//second unary result
        }
    },

    // normalizing eqn means adding '(' or this ')' to make valid eqn
    this.NormString = function (sTemp) {
        var iCounter = 0;
        var iOpCount = 0;
        var iClCount = 0;
        var iDifference = 0;

        for (iCounter = 0; iCounter < sTemp.length; iCounter++) {
            switch (sTemp.charAt(iCounter)) {
                case '(':
                    iOpCount++;//no of '('
                    break;
                case ')':
                    iClCount++;//no of ')'
                    break;
                default:
                    break;
            }
        }
        iDifference = iOpCount - iClCount;
        if (iDifference > 0) {
            for (iCounter = 0; iCounter < iDifference; iCounter++) {
                sTemp += ")";//add that many )
            }
        }
        else if (iDifference < 0) {
            iDifference *= -1;
            for (iCounter = 0; iCounter < iDifference; iCounter++) {
                sTemp = "(" + sTemp;//add that many (
            }
        }

        return (sTemp);
    },

    // Used for temrory calculation of conditional eqn
    this.TempResult = function (sInfix) {
        var i = 0;
        var temp1 = "";
        var temp2 = "";
        var temp3 = "";
        var res = false;

        for (i = 0; i < sInfix.length; i++) {
            if (sInfix.charAt(i) == '>' || sInfix.charAt(i) == '<' || sInfix.charAt(i) == '!' || sInfix.charAt(i) == '=')//chk these operators
            {
                temp3 = sInfix[i];
                if (sInfix.charAt(i + 1) == '=') {
                    temp3 += sInfix[i + 1];
                    i++;
                }
                temp1 = temp2;
                temp2 = "";
            }
            else {
                temp2 += sInfix[i];
            }
        }

        res = false;
        if (FCommon.String.isNullOrEmpty(temp1) || FCommon.String.isNullOrEmpty(temp3))//first statement eqn is empty calculate second eqn 
        {
            try {
                //res = ((int)UnaryResult(this.NormString(temp2))) > 0 ? true : false;//result 
                res = (this.UnaryResult(this.NormString(temp2))) > 0 ? true : false;//result 
            }
            catch (err) {
                this.m_sError = err.message;
            }
        }
        else {
            temp1 = this.NormString(temp1);//normalizing
            temp2 = this.NormString(temp2);
            var opd1 = this.UnaryResult(temp1);//first eqn
            var opd2 = this.UnaryResult(temp2);//second eqn
            var str = opd1.toString();
            if (FCommon.String.includes(str, "NaN") && FCommon.String.includes(temp3, "=="))//check valid double value
            {
                res = FCommon.String.compare(temp1, temp2, true) == 0 ? true : false;
                return (res);
            }

            str = opd2.toString();
            if (FCommon.String.includes(str, "NaN") && FCommon.String.includes(temp3, "==")) {
                res = FCommon.String.compare(temp1, temp2, true) == 0 ? true : false;
                return (res);
            }

            //res = this.TempResultForBoolean(opd1, opd2, temp3);//result of condl eqn  
            res = this.TempResultForDouble(opd1, opd2, temp3);//result of condl eqn  
        }

        return (res);
    },

    this.eVal = function (sNt) {
        var iCounter = 0;
        var objVar = null;

        if (sNt.charAt(0) == '-') {
            sNt = sNt.substr(1);
        }

        for (iCounter = 0; iCounter < this.VarList.length; iCounter++) {
            objVar = this.VarList[iCounter];//check in list

            if (FCommon.String.compare(objVar.strVar, sNt, true) == 0) {
                return (objVar.dVal);
            }
        }

        return (this.getDoubleMaxValue());
    },

    this.TempResultForDouble = function (dValue1, dValue2, sOperator) {
        var bResult = false;

        if (sOperator == ">") {
            bResult = dValue1 > dValue2;
        }
        else if (sOperator == "<") {
            bResult = dValue1 < dValue2;
        }
        else if (sOperator == "==") {
            bResult = (dValue1 == dValue2);
        }
        else if (sOperator == "!=") {
            bResult = (dValue1 != dValue2);
        }
        else if (sOperator == "<=") {
            bResult = (dValue1 <= dValue2);
        }
        else if (sOperator == ">=") {
            bResult = (dValue1 >= dValue2);
        }

        return (bResult);
    },

    this.getOperatorPrecedence = function (cValue) {
        var result = 0;

        switch (cValue) {
            case '#':
                result = 1;
                break;
            case '^':
                result = 7;
                break;
            case '!':
            case ']':
            case '[':
                result = 6;
                break;
            case '%':
            case '/':
            case '*':
                result = 5;
                break;
            case '+':
            case '-':
                result = 3;
                break;
            case '>':
            case '<':
                result = 0;
                break;
        }

        return (result);
    },

    // Result of arithmetic operation
    this.TempResultForArithmeticOperation = function (dValue1, dValue2, cOperator) {
        var result = 0.0;

        switch (cOperator) {
            case '*':
                result = (dValue1 * dValue2);
                break;
            case '/':
                result = dValue1 == 0 ? 0 : (dValue2 / dValue1);
                break;
            case '+':
                result = (dValue1 + dValue2);
                break;
            case '-':
                result = (dValue2 - dValue1);
                break;
            case '%':
                result = (dValue2 % dValue1);
                break;
            case '!':
                result = dValue1 * -1;
                break;
            case ']':
                result = Math.floor(dValue1);
                break;
            case '[':
                result = Math.ceil(dValue1);
                break;
            case '^':
                result = Math.pow(dValue2, dValue1);
                break;
            default:
                break;
        }

        this.pushStackOptValue(result);//push the result to stock
    },

    // Converting unary expression to postfix expression
    this.ToPostfix = function (sInfix) {
        var sPostfix = "";
        var cValue = '';
        var ct = '';
        var iCounter = 0;

        this.clearStackOpt();
        sInfix = "(" + sInfix + ")";

        //this.strarr = sInfix.Split(new Char[] { '(', ')', '+', '-', '*', '/', '%', '!', ']', '[', '^' });//splt by arith chars
        //this.strarr = sInfix.split(/(|)|\+|-|\*|\/|%|!|]|\[\^/); //splt by arith chars
        this.strarr = FCommon.String.split(sInfix, "()+-*/%!][^"); //splt by arith chars

        if (sInfix.charAt(1) == '*' || sInfix.charAt(1) == '/' || sInfix.charAt(1) == '%' || sInfix.charAt(1) == '^') {
            return ("");
        }

        for (iCounter = 0; iCounter < sInfix.length; iCounter++) {
            cValue = sInfix.charAt(iCounter);
            switch (cValue) {
                case '(':
                    this.pushStackOptValue(cValue);
                    break;
                case ')':
                    //pop all the chars in stock till u get (
                    do {
                        try {
                            ct = this.popStackOptValue();
                        }
                        catch (err) {
                            this.m_sError = err.message;

                            return ("");
                        }

                        if (ct != '(') {
                            sPostfix += ct;
                        }

                    } while (ct != '(');
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                case '!'://negation
                case ']'://floor
                case '['://ceil
                case '^'://power
                    /**/
                    if ((sInfix.charAt(iCounter) == '+' || sInfix.charAt(iCounter) == '-')
                        && (sInfix.charAt(iCounter + 1) == '+' || sInfix.charAt(iCounter + 1) == '-'))
                    {
                        return ("");
                    }

                    if (sInfix.charAt(iCounter + 1) == '*' || sInfix.charAt(iCounter + 1) == '/')
                    {
                        return ("");
                    }

                    if ((sInfix.charAt(iCounter - 1) == '(' || sInfix.charAt(iCounter - 1) == '/'
                        || sInfix.charAt(iCounter - 1) == '*' || sInfix.charAt(iCounter - 1) == '%'
                        || sInfix.charAt(iCounter - 1) == '^')
                        && sInfix.charAt(iCounter) == '-')//eg:(-1,/-1,*-1,%-1,^-1 
                    {
                        sPostfix += "@";//add @ charecter
                        sPostfix += sInfix[iCounter];
                    }
                    else if ((sInfix.charAt(iCounter - 1) == '(' || sInfix.charAt(iCounter - 1) == '/'
                        || sInfix.charAt(iCounter - 1) == '*' || sInfix.charAt(iCounter - 1) == '%'
                        || sInfix.charAt(iCounter - 1) == '^')
                        && sInfix.charAt(iCounter) == '+')//eg:(+1,/+1,*+1,%+1,^+1
                    {
                        sPostfix += "$";//add $ charecter
                        sPostfix += sInfix[iCounter];
                    }
                    else {
                        if (this.getStackOptCount() == 0)
                        {
                            this.pushStackOptValue(sInfix[iCounter]);
                        }
                        else
                        {
                            while (this.getStackOptCount() > 0)
                            {
                                try {
                                    ct = this.peekStackOptValue(); //tempararorypop (peek) the stack value (char)
                                }
                                catch (err) {
                                    this.m_sError = err.message;

                                    return ("");
                                }

                                if (this.getOperatorPrecedence(sInfix.charAt(iCounter)) > this.getOperatorPrecedence(ct))//check operator precedence
                                {
                                    break;
                                }
                                else
                                {
                                    try {
                                        ct = this.popStackOptValue(); //then Pop the value (char) from stack
                                    }
                                    catch (err) {
                                        this.m_sError = err.message;

                                        return ("");
                                    }

                                    sPostfix += ct;
                                }
                            }

                            this.pushStackOptValue(sInfix[iCounter]);//push the char to stack
                        }
                    }
                    break;
                default:
                    sPostfix += sInfix[iCounter];
                    break;
            }
        }

        if (this.getStackOptCount() != 0) {
            return ("");
        }

        return (sPostfix);
    },

    // UnaryResult

    // Calculate date diffrenece 
    this.getDateDiff = function (iDate1, iDate2) {
        var value = 0;

        try {
            value = DATE.prototype.getDateDiffInDays(iDate2, iDate1);
        }
        catch (err) { }

        return (value);
    },

    // Adds days to date 
    this.getDateAdd = function (iDate1, iDays) {
        return (DATE.prototype.addDays(iDate1, iDays, this.m_CalType));
    },

    // Return postfix for a logical expression
    this.LogicalPostfix = function (sInfix) {
        var postfix = "";
        var strTemp = "";
        var i = 0;

        this.clearStackOpt();

        sInfix = "(" + sInfix + ")";
        for (i = 0; i < sInfix.length; i++) {
            switch (sInfix.charAt(i)) {
                case '(':
                    this.pushStackOptValue(sInfix[i].toString());
                    break;
                case ')':
                    do//pop all the vals of stack till ( & add to postfix exp
                    {
                        try {
                            strTemp = this.popStackOptValue();
                        }
                        catch (err) {
                            this.m_sError = err.message;

                            return ("");
                        }

                        if (strTemp != "(") {
                            postfix += strTemp;
                        }
                    } while (strTemp != "(");
                    break;
                case '&':
                case '!':
                case '|':
                case '=':
                    strTemp = "";
                    if (sInfix.charAt(i) == '&') {
                        if (sInfix.charAt(i + 1) == '&')//is a logical &&
                        {
                            strTemp = "&&";
                            i++;
                        }
                        else
                            strTemp = "&";

                    }
                    else if (sInfix.charAt(i) == '|') {
                        if (sInfix.charAt(i + 1) == '|')//is a logical ||
                        {
                            strTemp = "||";
                            i++;
                        }
                        else
                            strTemp = "|";

                    }
                    else if (sInfix.charAt(i) == '!')//!= or !  
                    {
                        if (sInfix.charAt(i + 1) == '=') {
                            strTemp = "!=";
                            i++;
                        }
                        else
                            strTemp = "!";

                    }
                    else if (sInfix.charAt(i) == '=')  //==or=
                    {
                        if (sInfix.charAt(i + 1) == '=') {
                            strTemp = "==";
                            i++;
                        }
                        else
                            strTemp = "=";

                    }
                    if (this.getStackOptCount() == 0)//pust the operators to stock
                    {
                        this.pushStackOptValue(strTemp);
                    }
                    else {
                        while (this.getStackOptCount() > 0) {
                            var str = "";
                            try {
                                str = this.peekStackOptValue();
                            }
                            catch (err) {
                                this.m_sError = err.message;

                                return ("");
                            }

                            if (str == "(") {
                                break;
                            }
                            else {
                                try {
                                    str = this.popStackOptValue();
                                }
                                catch (err) {
                                    this.m_sError = err.message;

                                    return ("");
                                }

                                postfix += str;
                            }
                        }
                        this.pushStackOptValue(strTemp);//strTemp to stack
                    }

                    break;
                default:
                    if (sInfix.charAt(i) != ' ') {
                        postfix += sInfix[i];
                    }
                    break;
            }
        }

        if (this.getStackOptCount() != 0) {
            return ("");
        }

        return (postfix);
    },

    // Result of logical expression
    this.LogicalResult = function (sInfix) {
        var temp = "";
        var ds1 = "";
        var ds2 = "";
        var strtempds = "";
        var strRes = "";
        var arrRes = [];
        var stkRes = [];
        var dd1 = 0;
        var dd2 = 0;
        var i = 0;
        var j = 0;

        this.clearStackOpt();
        strRes = this.LogicalPostfix(sInfix);
        if (FCommon.String.isNullOrEmpty(strRes) == true) {
            return ("0");
        }

        if (strRes == "NaN") {
            return ("0");
        }

        // String[] arrRes = sInfix.Split('&', '|', '!', '=', '(', ')');//split with logical operators
        //arrRes = sInfix.split(/&|\||!|=|\(|\)/); //split with logical operators
        arrRes = FCommon.String.split(sInfix, "&|!=()"); //split with logical operators

        for (i = 0; i < strRes.length; i++) {
            if (strRes.charAt(i) == '&' || strRes.charAt(i) == '|' || strRes.charAt(i) == '!' || strRes.charAt(i) == '=')//if logical opt foound
            {
                var bds1 = true;
                var bds2 = true;
                try {
                    ds1 = stkRes[stkRes.length - 1];
                    stkRes.splice(stkRes.length - 1, 1);
                }
                catch (err) {
                    this.m_sError = err.message;
                    ds1 = "0";
                }

                try {
                    ds2 = stkRes[stkRes.length - 1];
                    stkRes.splice(stkRes.length - 1, 1);
                }
                catch (err) {
                    this.m_sError = err.message;
                    ds2 = "0";
                }

                try {
                    if (FConvert.isNumeric(ds1) == false) {
                        if ((dd1 = this.eVal(ds1)) == this.getDoubleMaxValue()) {
                            var objVar = this.getEmptyVariableParObject();
                            objVar.Var = ds1.charAt(0) == '-' ? ds1.substr(1) : ds1;
                            if (FCommon.String.isNullOrEmpty(this.fnValueNeeded) == false) {
                                dd1 = eval(this.fnValueNeeded)(this, objVar, this.getRowIndex(), this.getTag());
                            }
                        }

                        if (ds1.charAt(0) == '-') {
                            dd1 *= -1;
                        }
                        dd1 = FConvert.toDecimal(dd1);
                        strtempds = dd1.toString();
                        if (FCommon.String.includes(strtempds, "NaN")) {
                            bds1 = false;
                        }
                    }
                }
                catch (err) {
                    this.m_sError = err.message;
                }

                try {
                    if (FConvert.isNumeric(ds2) == false) {
                        if ((dd2 = this.eVal(ds2)) == this.getDoubleMaxValue()) {
                            var objVar = this.getEmptyVariableParObject();
                            objVar.Var = ds2.charAt(0) == '-' ? ds2.substr(1) : ds2;
                            if (FCommon.String.isNullOrEmpty(this.fnValueNeeded) == false) {
                                dd2 = eval(this.fnValueNeeded)(this, objVar, this.getRowIndex(), this.getTag());
                            }
                        }

                        if (ds2.charAt(0) == '-') {
                            dd2 *= -1;
                        }

                        dd2 = FConvert.toDecimal(dd2);
                        strtempds = dd2.toString();
                        if (FCommon.String.includes(strtempds, "NaN")) {
                            bds2 = false;
                        }
                    }
                }
                catch (err) {
                    this.m_sError = err.message;
                }

                var strTemp = "";
                if (strRes.charAt(i) == '&') {
                    if (strRes.charAt(i + 1) == '&') {
                        strTemp = "&&";
                        i++;
                    }
                    else {
                        strTemp = "&";
                    }
                }
                else if (strRes.charAt(i) == '|') {
                    if (strRes.charAt(i + 1) == '|') {
                        strTemp = "||";
                        i++;
                    }
                    else {
                        strTemp = "|";
                    }
                }
                else if (strRes.charAt(i) == '!') {
                    if (strRes.charAt(i + 1) == '=') {
                        strTemp = "!=";
                        i++;
                    }
                    else {
                        strTemp = "!";
                    }
                }
                else if (strRes.charAt(i) == '=') {
                    if (strRes.charAt(i + 1) == '=') {
                        strTemp = "==";
                        i++;
                    }
                    else {
                        strTemp = "=";
                    }
                }

                if (!bds1 || !bds2)// if 2 operands or invalid,do string comp for varibles
                {
                    if (FCommon.String.includes(strTemp, "==")) {
                        stkRes.push(FCommon.String.compare(ds1, ds2, true) == 0 ? "1" : "0");
                    }
                    else if (FCommon.String.includes(strTemp, "!=")) {
                        stkRes.push(FCommon.String.compare(ds1, ds2, true) == 0 ? "0" : "1");
                    }
                    else {
                        return ("0");
                    }
                }

                if (bds1 && bds2)//if valid
                    stkRes.push(this.LogicalTempResult(dd1, dd2, strTemp).toString());	//calculate result & push to stock					   
            }
            else {
                temp += strRes[i];
                for (; arrRes[j] == ""; j++);//iterate spltited vals till get valid spilt val 
                if (temp == arrRes[j])//matches
                {
                    temp = this.NormString(temp);
                    temp = this.UnaryResult(temp).toString();//calculate result & push to stack
                    if (FCommon.String.includes(temp, "NaN"))
                        stkRes.push(arrRes[j]);
                    else
                        stkRes.push(temp);
                    temp = "";
                    j++;
                }
            }
        }

        if (stkRes.length != 1)//more than value
        {
            return ("0");
        }

        ds1 = stkRes[stkRes.length - 1];
        stkRes.splice(stkRes.length - 1, 1);
        stkRes = [];

        return (ds1);
    },

    // Used for temporary calculation logical exp
    this.LogicalTempResult = function (dValue1, dValue2, sOperator) {
        var result = 0;
        var x = FConvert.toInt(dValue1);
        var y = FConvert.toInt(dValue2);
        //x=(x>0)?1:0;
        //y=(y>0)?1:0;

        if (sOperator == "&&") {
            result = (x > 0 ? true : false && y > 0 ? true : false) == true ? 1 : 0;
        }
        else if (sOperator == "||") {
            result = (x > 0 ? true : false || y > 0 ? true : false) == true ? 1 : 0;
        }
        else if (sOperator == "!=") {
            result = x != y ? 1 : 0;
        }
        else if (sOperator == "==") {
            result = x == y ? 1 : 0;

        }
        else if (sOperator == "&") {
            result = (int)(x & y);
        }
        else if (sOperator == "|") {
            result = (int)(x | y);
        }

        return (result);
    },

    this.RemoveSpaces = function (sInfix) {
        sInfix = sInfix.trim();
        //sInfix = sInfix.replace(" ", "");
        sInfix = sInfix.replace(/\s+/g, '');

        return (sInfix);
    },

    // Add a variable value
    this.AddVar = function (strVar, dVal) {
        var bFound = false;
        var iCounter = 0;
        var objVariable = null;

        for (iCounter = 0; iCounter < this.VarList.Count; iCounter++) {
            objVariable = this.VarList[iCounter];
            if (FCommon.String.compare(objVariable.strVar, strVar, true) == 0) {
                objVariable.dVal = dVal;
                this.VarList[iCounter] = objVariable;
                bFound = true;
                break;
            }
        }

        if (bFound == false) {
            objVariable = this.getEmptyVariableObject();
            objVariable.strVar = strVar;
            objVariable.dVal = dVal;
            this.VarList.push(objVariable);
        }
    },

    // Returns a list of all the functions used
    this.GetAllMethods = function (strExp) {
        var sVar = "";
        var arrMethods = [];
        var patt = null;
        var result = null;
        var iCounter = 0;

        patt = new RegExp("[a-zA-Z0-9]+\\(", "g");
        result = strExp.match(patt);
        if (FCommon.String.isNullOrEmpty(result) == false) {
            for (iCounter = 0; iCounter < result.length; iCounter++) {
                sVar = result[iCounter];
                arrMethods.push(sVar.substr(0, sVar.indexOf("(")));
            }
        }

        return (arrMethods);
    },

    // Method is used for result calculation of all types of exp
    //this.Result = function (sInfix, bCallbacksForAllVars) {
    //    var sNew = "";
    //    var sResult = "0";
    //    var iStart = 0;
    //    var iEnd = 0;

    //    if (sInfix.startsWith("(") && sInfix.endsWith(")")) {
    //        sInfix = sInfix.substr(1, sInfix.length - 2);
    //    }            

    //    while(true)
    //    {
    //        iStart = sInfix.lastIndexOf('(');
    //        if (iStart == -1) {
    //            break;
    //        }                

    //        iEnd = iStart + 1;
    //        while (sInfix[iEnd++] != ')');
    //        iEnd--;

    //        sNew = sInfix.substr(iStart, iEnd - iStart + 1);
    //        sNew = sNew.substr(1, sNew.length - 2);
    //        sResult = this.ResultInternal(sNew, bCallbacksForAllVars);
    //        sInfix = sInfix.replace("(" + sNew + ")", sResult);
    //    }

    //    sResult = "";
    //    if (FConvert.isNumeric(sInfix)) {
    //        sResult = sInfix;
    //    }
    //    else {
    //        sResult = this.ResultInternal(sInfix, bCallbacksForAllVars);
    //    }

    //    return (sResult);
    //},
    
    this.Result = function (sInfix, bCallbacksForAllVars) {
        var bCon = false;

        this.m_bCallbacksForAllVars = bCallbacksForAllVars;

        sInfix = this.RemoveSpaces(sInfix);
        if (!this.TestString(sInfix) || FCommon.String.isNullOrEmpty(sInfix) == true) {
            return ("NaN");
        }

        bCon = FCommon.String.includes(sInfix, "?");
        if (bCon) {
            if (FCommon.String.includes(sInfix, ":")) {
                return this.TTernaryTempResult(sInfix);
            }

            return ("NaN");
        }

        bCon = FCommon.String.includes(sInfix, "&") || FCommon.String.includes(sInfix, "|") || FCommon.String.includes(sInfix, "!=") || FCommon.String.includes(sInfix, "==") || FCommon.String.includes(sInfix, ">") || FCommon.String.includes(sInfix, "<");
        if (bCon && !FCommon.String.includes(sInfix.trim().toUpperCase(), "COND")) {
            return this.LogicalResult(sInfix);
        }
        else {
            return this.UnaryResult(sInfix).toString();
        }
    },

    this.IsFunction = function (strVar, bMatchWhole) {
        strVar = strVar.toLowerCase();
        if (bMatchWhole == true) {

            if (strVar.localeCompare("cond") == 0
                || strVar.localeCompare("min") == 0
                || strVar.localeCompare("max") == 0
                || strVar.localeCompare("dateadd") == 0
                || strVar.localeCompare("datediff") == 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (strVar.startsWith("cond(")
                || strVar.startsWith("min(")
                || strVar.startsWith("max(")
                || strVar.startsWith("dateadd(")
                || strVar.startsWith("datediff(")) {
                return true;
            }
            else {
                return false;
            }
        }
    },

    /// <summary>
    /// get all the variables
    /// </summary>
    /// <param name="sInfix">expression</param>
    /// <param name="bWithMethods">pass true if user defined methods are also required, false otherwise</param>
    /// <returns>variables array</returns>
    this.GetVariables = function (sInfix, bWithMethods) {
        var sVar = "";
        var iCounter = 0;
        var arrVariables = [];
        var arr = null;
        var patt = null;

        sInfix = this.RemoveSpaces(sInfix);

        // String[] arr = sInfix.Split('+', '-', '/', '*', '=', '!', '<', '>', '&', '|', '(', ')', '?', ':', ',', '^');
        //arr = sInfix.split(/\+|-|\/|\*|=|!|<|>|&|\||\(|\)|\?|:|,|^/);
        arr = FCommon.String.split(sInfix, "+-/*=!<>&|()?:,^");
        for (iCounter = 0; iCounter < arr.length; iCounter++) {
            if (FCommon.String.isNullOrEmpty(arr[iCounter]) == false) {
                if (this.IsFunction(arr[iCounter], true) == false && FConvert.isNumeric(arr[iCounter]) == false) {
                    arrVariables.push(arr[iCounter]);
                }
            }
        }

        if (bWithMethods == true) {
            patt = new RegExp("[a-zA-Z0-9]+\\([a-zA-Z0-9,]+\\)", "g");
            arr = sInfix.match(patt);
            if (FCommon.String.isNullOrEmpty(arr) == false) {
                for (iCounter = 0; iCounter < arr.length; iCounter++) {
                    sVar = arr[iCounter];
                    if (this.IsFunction(sVar, false) == false) {
                        arrVariables.push(sVar);
                    }
                }
            }
        }

        return (arrVariables);
    },

    // Clear all tha variables
    this.ResetVars = function () {
        this.VarList = [];
    },

    /// string expression evalution
    // Equal to                            ==
    //Not equal to                    !=
    //Logical and                      &&
    //Logical or                         ||
    //Less then                          <
    //Greater then                     >
    //Less than or equal to      <=
    //Greater than or equal to >=
    //Is Present		      ^
    //Is Not Present	      !^
    //Is Blank		      -
    //Is Not Blank    	      !-
    //Begins With	      $
    //Does Not Begins With     !$
    //Match Patern	      `
    //Does Not Match Patern  !`
    //Ternary operator              ?
    //Ternary                              :
    //Negation                           !
    //Open bracket                   (
    //Close bracket                   )

    //Ex for is blank: ABC- && xyz $y returns false
    //Ex for is blank: ABC- || xyz $x returns true

    //Ex for is blank: !-  returns true

    //(mahmood!$x?mahmood:javed)==mahmood?12345:245
    this.StringExpressionEvalution = function (strEval) {
        var strOpt = "";
        var strLogic = "";
        //Char[] chars = null;
        var j = 0;
        var i = 0;

        try {
            strEval = this.TrimbyParanthesis(strEval);
            strEval = "(" + strEval + ")";

            for (i = 0; i < strEval.length; i++) {
                switch (strEval.charAt(i)) {
                    case ')':
                        {
                            strOpt += strEval[i];
                            strOpt = this.NormString(strOpt);
                            j = strOpt.length - 1;
                            strLogic = "";
                            while (strOpt.charAt(j) != '(')//serach for ( backwards
                            {
                                strLogic += strOpt[j];//adding in reverse way
                                j--;
                            }

                            strLogic = FCommon.String.reverse(strLogic);
                            //chars = strLogic.ToCharArray();
                            //Array.Reverse(chars);//reversing chars
                            //strLogic = new String(chars);


                            strLogic = this.NormString(strLogic);
                            strOpt = strOpt.Replace(strLogic, this.StringEvalution(strLogic));//evalute exp & replace 
                        }
                        break;
                    default:
                        strOpt += strEval[i];
                        break;
                }
            }
        }
        catch (err) {
            this.m_sError = err.message;
            strOpt = "Invalid Expression";
        }

        return FCommon.String.compare(strOpt, "NaN") == 0 ? "Invalid Expression" : strOpt;
    },

    // String evalution (temperory)
    this.StringEvalution = function (strEval) {
        var strOpt = null;
        var strLogic = "";
        var i = 0;

        //strEval = strEval.replace(" ", "");
        strEval = strEval.replace(/\s+/g, '');

        this.clearStackOpt();

        for (i = 0; i < strEval.length; i++) {
            switch (strEval.charAt(i)) {
                case '(':
                    strOpt = "";//make string operator exp empty 
                    strLogic += "(";
                    break;
                case ')':
                    if (FCommon.String.isNullOrEmpty(strOpt) == false) //evalute expression 
                    {
                        strLogic += (this.StringEval(strOpt));//add to actual exp
                    }
                    strLogic += (")");
                    strOpt = "";
                    break;
                case '|'://logical or
                    i++;//increase i
                    if (FCommon.String.isNullOrEmpty(strOpt) == false) {
                        strLogic += (this.StringEval(strOpt));//evalute expression 
                    }

                    strLogic += ("||");
                    strOpt = "";
                    break;
                case '&'://logical AND
                    i++;
                    if (FCommon.String.isNullOrEmpty(strOpt) == false) {
                        strLogic += (this.StringEval(strOpt));
                    }
                    strLogic += ("&&");
                    strOpt = "";
                    break;
                case '?':
                    if (FCommon.String.isNullOrEmpty(strOpt) == false) {
                        strLogic += (this.StringEval(strOpt));
                    }

                    strLogic += ("?");
                    strOpt = "";
                    break;
                case ':':
                    if (FCommon.String.isNullOrEmpty(strOpt) == false) {
                        strLogic += (this.StringEval(strOpt));
                    }

                    strLogic += (":");
                    strOpt = "";
                    break;
                default:
                    strOpt += strEval[i];
                    break;
            }
        }

        if (FCommon.String.isNullOrEmpty(strOpt) == false) {
            strLogic += (this.StringEval(strOpt));//evalute
        }

        strOpt = "";
        if (FCommon.String.includes(strLogic, "?"))//is a ternary exp
        {
            strOpt = this.StringTernaryEval(strLogic);
        }
        else//logical exp
        {
            strOpt = this.StringLogicalResult(strLogic);
        }

        return strOpt;
    },

    // Evalution of string exp
    this.StringEval = function (sText) {
        var arrTemp = [];
        var bResult = false;
        var arr = null;
        var iCounter = 0;
        var bDecimal = false;
        var d1 = 0;
        var d2 = 0;

        //arr = sText.split(/=|!|<|>|^|$|-|`/);
        arr = FCommon.String.split(sText, "=!<>^$-`");
        if (arr.length < 2) {
            return ("0");
        }

        //remove the empty strings in array
        for (iCounter = 0; iCounter < arr.length; iCounter++) {
            if (FCommon.String.isNullOrEmpty(arr[iCounter], true) == false) {
                arrTemp.push(arr[iCounter].trim());
            }
        }
        arr = arrTemp;

        if (FConvert.isNumeric(arr[0]) && FConvert.isNumeric(arr[1])) {
            bDecimal = true;
            d1 = FConvert.toDecimal(arr[0]);
            d2 = FConvert.toDecimal(arr[1]);
        }

        if (FCommon.String.includes(sText, "==")) {
            if (bDecimal == true) {
                bResult = d1 == d2;
            }
            else {
                bResult = FCommon.String.compare(arr[0], arr[1], true) == 0;
            }
        }
        else if (FCommon.String.includes(sText, "!=")) {
            if (bDecimal == true) {
                bResult = d1 != d2;
            }
            else {
                bResult = FCommon.String.compare(arr[0], arr[1], true) != 0;
            }
        }
        else if (FCommon.String.includes(sText, "<=")) {
            if (bDecimal == true) {
                bResult = d1 <= d2;
            }
            else {
                bResult = FCommon.String.compare(arr[0], arr[1], true) <= 0;
            }
        }
        else if (FCommon.String.includes(sText, ">=")) {
            if (bDecimal == true) {
                bResult = d1 >= d2;
            }
            else {
                bResult = FCommon.String.compare(arr[0], arr[1], true) >= 0;
            }
        }
        else if (FCommon.String.includes(sText, "<")) {
            if (bDecimal == true) {
                bResult = d1 < d2;
            }
            else {
                bResult = FCommon.String.compare(arr[0], arr[1], true) < 0;
            }
        }
        else if (FCommon.String.includes(sText, ">")) {
            if (bDecimal == true) {
                bResult = d1 > d2;
            }
            else {
                bResult = FCommon.String.compare(arr[0], arr[1], true) > 0;
            }
        }
        else if (FCommon.String.includes(sText,"!")) {
            bResult = !FCommon.String.includes(arr[0], arr[1]);
        }
        else if (FCommon.String.includes(sText, "")) {
            bResult = FCommon.String.includes(arr[0], arr[1]);
        }
        else if (FCommon.String.includes(sText, "!-")) { // Not Empty
            bResult = !FCommon.String.isNullOrEmpty(arr[0]);
        }
        else if (FCommon.String.includes(sText, "-")) { // Empty
            bResult = FCommon.String.isNullOrEmpty(arr[0]);
        }
        else if (FCommon.String.includes(sText, "!$")) { // Not Starts With
            bResult = !arr[0].startsWith(arr[1]);
        }
        else if (FCommon.String.includes(sText, "$")) { // Starts With
            bResult = arr[0].startsWith(arr[1]);
        }
        else {
            return (arr[0]);
        }

        return bResult == true ? "1" : "0";
    },

    // Ternary string exp evalution
    this.StringTernaryEval = function (sInfix) {
        var strTemp = "";
        var TempRes = "";
        var i = 0;
        var j = 0;

        //sInfix = sInfix.replace(" ", "");
        sInfix = sInfix.replace(/\s+/g, '');

        for (i = 0; i < sInfix.length; i++) {
            switch (sInfix.charAt(i))
            {
                case '(':
                    TempRes = "";
                    for (j = i; sInfix.charAt(j) != ')'; j++)//find out coreesponding ')'
                    {
                        TempRes += sInfix[j];
                        i++;
                    }
                    TempRes += sInfix[i];

                    if (FCommon.String.includes(TempRes, "?"))//is a ternary eqn
                    {
                        if (FCommon.String.includes(TempRes, ":"))//should contain :
                        {
                            strTemp += this.TempStringTernaryEval(TempRes);
                        }
                        else
                        {
                            return ("NaN");
                        }
                    }
                    else if (FCommon.String.includes(TempRes, ">") || FCommon.String.includes(TempRes, "<")
                        || FCommon.String.includes(TempRes, "&&") || FCommon.String.includes(TempRes, "||")
                        || FCommon.String.includes(TempRes, "!=") || FCommon.String.includes(TempRes, "=="))//logical
                    {
                        strTemp += TempRes;
                    }
                    else
                    {
                        TempRes = this.NormString(TempRes);
                        strTemp += TempRes;
                    }
                    break;

                default:
                    strTemp += sInfix[i];
                    break;
            }
        }

        strTemp = this.NormString(strTemp);

        if (FCommon.String.includes(strTemp, "?"))
        {
            if (FCommon.String.includes(strTemp, ":"))
            {
                strTemp = this.TempStringTernaryEval(strTemp);
            }
            else
            {
                return ("NaN");
            }
        }
        else
        {
            strTemp = strTemp.trim();

        }

        return (strTemp);
    },
    
    // Ternary string Eval,Used in StringTernaryEval Method
    this.TempStringTernaryEval = function (sInfix) {
        var strTemp = "";
        var stkTemp = [];//Temp stack
        var i = 0;

        //sInfix = sInfix.replace(" ", "");
        sInfix = sInfix.replace(/\s+/g, '');
        for (i = 0; i < sInfix.length; i++)
        {
            switch (sInfix.charAt(i))
            {
                case '?':
                case ':':
                    strTemp = this.NormString(strTemp);
                    stkTemp.push(strTemp);
                    strTemp = "";//make empty
                    break;

                default:
                    strTemp += sInfix[i];//add to temp
                    break;
            }
        }

        stkTemp.push(this.NormString(strTemp));//push the result

        while (stkTemp.length != 1)//check stack vals
        {
            var str1 = "";
            var res1 = "";
            var res2 = "";

            res2 = stkTemp[stkTemp.length - 1]; // Second result
            stkTemp.splice(stkTemp.length - 1, 1);


            res1 = stkTemp[stkTemp.length - 1];  // First result
            stkTemp.splice(stkTemp.length - 1, 1);

            str1 = stkTemp[stkTemp.length - 1]; // Exp
            stkTemp.splice(stkTemp.length - 1, 1);

            str1 = this.TrimbyParanthesis(str1);
            res1 = this.TrimbyParanthesis(res1);
            res2 = this.TrimbyParanthesis(res2);

            stkTemp.push(FCommon.String.includes(str1, "1") == true ? res1 : res2);
        }

        strTemp = stkTemp[stkTemp.length - 1];
        stkTemp.splice(stkTemp.length - 1, 1);

        return(strTemp);
    },

    // eliminating ( )
    this.TrimbyParanthesis = function (str) {
        str = FCommon.String.trimStart(str, '(');
        str = FCommon.String.trimEnd(str, ')');

        return (str);
    },

    // Postfix for logical string exp
    this.StringLogicalPostfix = function (sInfix) {
        var postfix = "";
        var strTemp = "";
        var i = 0;

        this.clearStackOpt();
    
        sInfix = "(" + sInfix + ")";
        for (i = 0; i < sInfix.length; i++)
        {
            switch (sInfix.charAt(i))
            {
                case '(':
                    this.pushStackOptValue(sInfix.charAt(i).toString());
                    break;
                case ')':
                    do//check for (
                    {
                        try
                        {
                            strTemp = this.popStackOptValue();
                        }
                        catch (err)
                        {
                            this.m_sError = err.message;
                            return ("");
                        }

                        if (strTemp != "(") {
                            postfix += strTemp;
                        }                            
                    } while (strTemp != "(");
                    break;
                case '&':
                case '!':
                case '|':
                case '=':
                    strTemp = "";
                    if (sInfix.charAt(i) == '&')
                    {
                        if (sInfix.charAt(i + 1) == '&')//logical AND
                        {
                            strTemp = "&&";
                            i++;
                        }
                        else {
                            strTemp = "&";
                        }
                    }
                    else if (sInfix.charAt(i) == '|')
                    {
                        if (sInfix.charAt(i + 1) == '|')
                        {
                            strTemp = "||";
                            i++;
                        }
                        else {
                            strTemp = "|";
                        }
                    }
                    else if (sInfix.charAt(i) == '!')
                    {
                        if (sInfix.charAt(i + 1) == '=')
                        {
                            strTemp = "!=";
                            i++;
                        }
                        else {
                            strTemp = "!";
                        }
                    }
                    else if (sInfix.charAt(i) == '=')
                    {
                        if (sInfix.charAt(i + 1) == '=')
                        {
                            strTemp = "==";
                            i++;
                        }
                        else {
                            strTemp = "=";
                        }
                    }
                    if (this.getStackOptCount() == 0)
                    {
                        this.pushStackOptValue(strTemp);//push the resulted operator to stack
                    }
                    else
                    {
                        while (this.getStackOptCount() > 0)
                        {
                            var str = "";
                            try
                            {
                                str = this.peekStackOptValue();
                            }
                            catch (err)
                            {
                                this.m_sError = err.message;
                                return ("");
                            }

                            if (str == "(") {
                                break;
                            }
                            else
                            {
                                try
                                {
                                    str = this.popStackOptValue(); //pop tha val push to stack
                                }
                                catch (err)
                                {
                                    this.m_sError = err.message;
                                    return ("");
                                }

                                postfix += str;
                            }
                        }

                        this.pushStackOptValue(strTemp); // last resulted push to stack
                    }

                    break;
                default:
                    if (sInfix.charAt(i) != ' ') {
                        postfix += sInfix[i];
                    }                        
                    break;
            }
        }

        if (this.getStackOptCount() != 0) {
            return ("");
        }

        return (postfix);
    },

    // Logical string exp Evalution
    this.StringLogicalResult = function (sInfix) {
        var temp = "";
        var ds1 = "";
        var ds2 = "";
        var strRes = "";
        var stkRes = [];
        var i = 0;
        var j = 0;
        var arrRes = null;

        this.clearStackOpt();
        strRes = this.LogicalPostfix(sInfix);//postfix

        //String[] arrRes = sInfix.Split('&', '|', '!', '=', '(', ')');//split by string operator
        //arrRes = sInfix.split(/&|\||!|=|\(|\)/); // split by string operator
        arrRes = FCommon.String.split(sInfix, "&|!=()"); // split by string operator

        if (FCommon.String.isNullOrEmpty(strRes) == true)
        {
            return (strRes);
        }

        if (strRes == "NaN")
        {
            return (strRes);
        }

        for (i = 0; i < strRes.length; i++) {
            if (strRes.charAt(i) == '&' || strRes.charAt(i) == '|' || strRes.charAt(i) == '!' || strRes.charAt(i) == '=')//check for operator
            {
                try
                {
                    ds1 = stkRes[stkRes.length - 1];
                    stkRes.splice(stkRes.length - 1, 1);
                }
                catch (err)
                {
                    this.m_sError = err.message;
                    return sInfix;
                }

                try
                {
                    ds2 = stkRes[stkRes.length - 1];
                    stkRes.splice(stkRes.length - 1, 1);
                }
                catch (err)
                {
                    this.m_sError = err.message;
                    return sInfix;

                }

                var strTemp = "";
                if (strRes.charAt(i) == '&')
                {
                    if (strRes.charAt(i + 1) == '&')
                    {
                        strTemp = "&&";
                        i++;
                    }
                    else {
                        strTemp = "&";
                    }
                }
                else if (strRes.charAt(i) == '|')
                {
                    if (strRes.charAt(i + 1) == '|')
                    {
                        strTemp = "||";
                        i++;
                    }
                    else {
                        strTemp = "|";
                    }
                }
                else if (strRes.charAt(i) == '!')
                {
                    if (strRes.charAt(i + 1) == '=')
                    {
                        strTemp = "!=";
                        i++;
                    }
                    else {
                        strTemp = "!";
                    }
                }
                else if (strRes.charAt(i) == '=')
                {
                    if (strRes.charAt(i + 1) == '=')
                    {
                        strTemp = "==";
                        i++;
                    }
                    else {
                        strTemp = "=";
                    }
                }

                stkRes.push(this.StringLogicalTempResult(ds1, ds2, strTemp).toString());//push the result						   
            }
            else
            {
                temp += strRes[i];
                for (; arrRes[j] == ""; j++) ;//valid string in array
                if (temp == arrRes[j])
                {
                    temp = this.NormString(temp);
                    stkRes.push(temp);
                    temp = "";
                    j++;
                }
            }
        }

        if (stkRes.length != 1)//should not get more than 1 in stock 
        {
            return (sInfix);
        }

        ds1 = stkRes[stkRes.length - 1];
        stkRes.splice(stkRes.length - 1, 1);
        stkRes = [];

        return (ds1);
    },

    // Logical exp result,used in StringLogicalResult methos
    this.StringLogicalTempResult = function(sOperand1, sOperand2, sOperator) {
        var res = 0;
        var x = Convert.ToInt32(sOperand1);
        var y = Convert.ToInt32(sOperand2);
        //x=(x>0)?1:0;
        //y=(y>0)?1:0;

        if (sOperator == "&&") {
            res = (x > 0 ? true : false && y > 0 ? true : false) == true ? 1 : 0;
        }
        else if (sOperator == "||") {
            res = (x > 0 ? true : false || y > 0 ? true : false) == true ? 1 : 0;
        }
        else if (sOperator == "!=") {
            res = x != y ? 1 : 0;
        }
        else if (sOperator == "==") {
            res = x == y ? 1 : 0;
        }
        else if (sOperator == "&") {
            res = (int)(x & y);
        }
        else if (sOperator == "|") {
            res = (int)(x | y);
        }

        return(res);
    },

    this.UnaryResult = function (sInfix) {
        var temp = "";
        var ds1 = "";
        var ds2 = "";
        var strTempRes = "";
        var flag = 0;
        var dd1 = 0;
        var dd2 = 0;
        var i = 0;
        var j = 0;
        var k = 0;
        var lstMethods = [];

        this.clearStackOpt();
        sInfix = sInfix.toString();
        sInfix = sInfix.trim();

        //char[] chOperators = new char[] { '+', '-', '*', '/', '%', '!', ']', '[', '^' };//split by arith operators
        var chOperators = "+-*/%!][^";
    
        try
        {
            temp = sInfix;
            //temp = temp.replace("(", "");
            //temp = temp.replace(")", "");
            temp = temp.replace(/\(/g, "");
            temp = temp.replace(/\)/g, "");

            if(FConvert.isNumeric(temp) == true) {
            //if (temp.length > 0 && isNaN(temp) == false) {
                dd1 = FConvert.toDecimal(temp);

                return(dd1);
            }
            else {
                dd1 = 0.0;
            }
        
            temp = "";
        }
        catch (err) {
            console.log("Exception: {FFormula.UnaryResult::" + sInfix + ":: " + err.message);
        }

        //check for Focus Functions
        //if (sInfix.ToUpper().Contains("MAX") || sInfix.ToUpper().Contains("MIN") || sInfix.ToUpper().Contains("ROUND") || sInfix.ToUpper().Contains("DATEDIFF") || sInfix.ToUpper().Contains("COND"))
        lstMethods = this.GetAllMethods(sInfix);
        if (lstMethods.length > 0)
        {
            var stktemp = [];//initialising temporary stack

            for (i = 0; i < lstMethods.length; i++)
            {
                stktemp.push(lstMethods[i]);//push to stack 
            }

            while (stktemp.length != 0)//If Focus Funns Exits in Expression(check temperory stack count)
            {
                temp = stktemp[stktemp.length - 1].toString(); // take the FUNC
                stktemp.splice(stktemp.length - 1, 1);

                // region Maximum 
                //eg:Max(100,200)
                if (FCommon.String.compare(temp, "MAX", true) == 0)//if MAX
                {
                    m_iIndex = sInfix.lastIndexOf(temp);//find last index of max
                    flag = j = k = 0;
                    temp = ds1 = ds2 = strTempRes = "";
                    for (i = m_iIndex; i < sInfix.length; i++)
                    {
                        strTempRes += sInfix[i];//add all the chars to  temp string
                        switch (sInfix.charAt(i))
                        {
                            case '(':
                                if (j == 0)
                                    ds1 = ds2 = temp = "";
                                else
                                    temp += sInfix[i];
                                j++;
                                break;
                            case ')':
                                k++;
                                if (j == k)//if no.of (=no.of )
                                {
                                    //Max(100,200)
                                    ds2 = temp;
                                    temp = Math.max(this.UnaryResult(ds1), this.UnaryResult(ds2)).toString();
                                    ds1 = ds2 = "";
                                    sInfix = sInfix.replace(strTempRes, temp);//replace (like eg:Max(100,200)) with the result in the whole expression
                                    flag = 1;//result obtained ,set falg
                                }
                                else
                                {
                                    temp += sInfix[i];//add to temp
                                }
                                break;
                            case ',':
                                ds1 = temp;//first operand ds1
                                temp = ds2 = "";
                                break;
                            default:
                                temp += sInfix[i];
                                break;
                        }

                        if (flag == 1)  {
                            break;
                        }
                    }
                } // End region Maximum

                // region Minimum
                //Similar to max
                else if (FCommon.String.compare(temp, "MIN", true) == 0)
                {
                    //eg:MIn(100,200)
                    m_iIndex = sInfix.lastIndexOf(temp);
                    flag = j = k = 0;
                    temp = ds1 = ds2 = strTempRes = "";
                    for (i = m_iIndex; i < sInfix.length; i++)
                    {
                        strTempRes += sInfix[i];
                        switch (sInfix.charAt(i))
                        {
                            case '(':
                                if (j == 0)
                                    ds1 = ds2 = temp = "";
                                else
                                    temp += sInfix[i];
                                j++;
                                break;
                            case ')':
                                k++;
                                if (j == k)
                                {
                                    ds2 = temp;
                                    temp = Math.min(this.UnaryResult(ds1), this.UnaryResult(ds2)).toString();
                                    ds1 = ds2 = "";
                                    sInfix = sInfix.replace(strTempRes, temp);
                                    flag = 1;
                                }
                                else
                                {
                                    temp += sInfix[i];
                                }
                                break;
                            case ',':
                                ds1 = temp;
                                temp = ds2 = "";
                                break;
                            default:
                                temp += sInfix[i];
                                break;
                        }

                        if (flag == 1) {
                            break;
                        }
                    }
                } // End region Minimum

                // region ROUND
                //ROUND(123, 7)
                else if (FCommon.String.compare(temp, "ROUND", true) == 0)
                {
                    m_iIndex = sInfix.lastIndexOf(temp);
                    flag = j = k = 0;
                    temp = ds1 = ds2 = strTempRes = "";
                    for (i = m_iIndex; i < sInfix.length; i++)
                    {
                        strTempRes += sInfix[i];
                        switch (sInfix.charAt(i))
                        {
                            case '(':
                                if (j == 0)
                                    ds1 = ds2 = temp = "";
                                else
                                    temp += sInfix[i];
                                j++;
                                break;
                            case ')':
                                k++;
                                if (j == k)
                                {
                                    ds2 = temp;
                                    //temp = Math.Round(this.UnaryResult(ds1), FConvert.toInt(this.UnaryResult(ds2))).ToString();
                                    temp = Math.round(this.UnaryResult(ds1)).toString();
                                    ds1 = ds2 = "";
                                    sInfix = sInfix.replace(strTempRes, temp);
                                    flag = 1;
                                }
                                else
                                {
                                    temp += sInfix[i];
                                }
                                break;
                            case ',':
                                ds1 = temp;
                                temp = ds2 = "";
                                break;
                            default:
                                temp += sInfix[i];
                                break;
                        }

                        if (flag == 1) {
                            break;
                        }
                    }
                } // End region ROUND

                // region DateDiff
                //DATEDIFF(100,200)
                else if (FCommon.String.compare(temp, "DATEDIFF", true) == 0)
                {
                    m_iIndex = sInfix.lastIndexOf(temp);
                    flag = j = k = 0;
                    temp = ds1 = ds2 = strTempRes = "";
                    for (i = m_iIndex; i < sInfix.length; i++)
                    {
                        strTempRes += sInfix[i];
                        switch (sInfix.charAt(i))
                        {
                            case '(':
                                if (j == 0)
                                    ds1 = ds2 = temp = "";
                                else
                                    temp += sInfix[i];
                                j++;
                                break;
                            case ')':
                                k++;
                                if (j == k)
                                {
                                    ds2 = temp;
                                    temp = this.getDateDiff(FConvert.toInt(this.UnaryResult(ds1)), FConvert.toInt(this.UnaryResult(ds2))).toString();//date difference
                                    ds1 = ds2 = "";
                                    sInfix = sInfix.replace(strTempRes, temp);
                                    flag = 1;
                                }
                                else
                                {
                                    temp += sInfix[i];
                                }
                                break;
                            case ',':
                                ds1 = temp;
                                temp = ds2 = "";
                                break;
                            default:
                                temp += sInfix[i];
                                break;
                        }

                        if (flag == 1) {
                            break;
                        }
                    }
                } // End region DATEDIFF

                // region DateAdd
                //DATEADD(100,200)
                else if (FCommon.String.compare(temp, "DATEADD", true) == 0)
                {
                    m_iIndex = sInfix.lastIndexOf(temp);
                    flag = j = k = 0;
                    temp = ds1 = ds2 = strTempRes = "";
                    for (i = m_iIndex; i < sInfix.length; i++)
                    {
                        strTempRes += sInfix[i];
                        switch (sInfix.charAt(i))
                        {
                            case '(':
                                if (j == 0)
                                    ds1 = ds2 = temp = "";
                                else
                                    temp += sInfix[i];
                                j++;
                                break;
                            case ')':
                                k++;
                                if (j == k)
                                {
                                    ds2 = temp;
                                    temp = this.getDateAdd(FConvert.toInt(this.UnaryResult(ds1)), FConvert.toInt(this.UnaryResult(ds2))).toString();//date difference
                                    ds1 = ds2 = "";
                                    sInfix = sInfix.replace(strTempRes, temp);
                                    flag = 1;
                                }
                                else
                                {
                                    temp += sInfix[i];
                                }
                                break;
                            case ',':
                                    ds1 = temp;
                                    temp = ds2 = "";
                                break;
                            default:
                                temp += sInfix[i];
                                break;

                        }
                        if (flag == 1)  {
                            break;
                        }
                    }
                } // End region DateAdd

                // region Cond
                //Cond(1>12,10,11)
                else if (FCommon.String.compare(temp, "COND", true) == 0)
                {
                    m_iIndex = sInfix.lastIndexOf(temp);
                    j = k = flag = 0;
                    var iComma = 0;
                    temp = ds1 = ds2 = strTempRes = "";

                    //condition has to commas
                    for (i = m_iIndex; i < sInfix.length; i++)
                    {
                        strTempRes += sInfix[i];
                        switch (sInfix.charAt(i))
                        {
                            case '(':
                                if (j == 0)
                                    ds1 = ds2 = temp = "";
                                else
                                {
                                    if (iComma == 0)//till now no comma found,make 1st expression
                                        temp += sInfix[i];
                                    else if (iComma == 1)//1 comma found,make 1st operand
                                        ds1 += sInfix[i];
                                    else
                                        ds2 += sInfix[i];//2 commas found ,make 2nd operand    
                                }
                                j++;
                                break;
                            case ')':
                                k++;
                                if (j == k)//no of (=no of )
                                {
                                    temp = this.TTernaryTempResult(temp + "?" +ds1 + ":" + ds2);//make ternary equation & find the result
                                    sInfix = sInfix.replace(strTempRes, temp);//repacing in expression
                                    flag = 1;
                                }
                                else
                                {
                                    if (iComma == 0)
                                        temp += sInfix[i];
                                    else if (iComma == 1)
                                        ds1 += sInfix[i];
                                    else
                                        ds2 += sInfix[i];
                                }
                                break;
                            case ',':
                                iComma++;
                                ds2 = "";
                                break;
                            default:
                                {
                                    if (iComma == 0)
                                        temp += sInfix[i];
                                    else if (iComma == 1)
                                        ds1 += sInfix[i];
                                    else
                                        ds2 += sInfix[i];
                                }

                                break;
                        }

                        if (flag == 1)  {
                            break;
                        }
                    }
                } // End region Cond

                 // region Focus varialbes with parameters
                else
                {
                    m_iIndex = sInfix.lastIndexOf(temp); // get the last occurance of this variable
                    var iIndex = sInfix.indexOf(')', m_iIndex + 1);
                    var strTemp = sInfix.substr(m_iIndex + temp.length + 1, iIndex - m_iIndex - temp.length - 1);
                    var strVar = "";

                    var objVar = this.getEmptyVariableParObject();
                    objVar.Var = temp;

                    if (strTemp.indexOf(',') < 0) // only 1 arguement
                    {
                        var dVal = 0.00;
                        if (FConvert.isNumeric(strTemp) == false)
                        {
                            dVal = this.UnaryResult(strTemp);
                        }
                        else {
                            dVal = FConvert.toDecimal(strTemp);
                        }

                        objVar.Params = []; //new double[1];
                        objVar.Params.push(dVal);
                        var d = eval(this.fnValueNeeded)(this, objVar, this.getRowIndex(), this.getTag());

                        strVar = sInfix.substr(m_iIndex, iIndex - m_iIndex + 1);
                        sInfix = sInfix.replace(strVar, d.toString());
                    }
                    else
                    {
                        var arrVars = strTemp.split(',');
                        var arrParams = [];
                        for (var l = 0; l < arrVars.length; l++) {
                            arrParams.push(this.UnaryResult(arrVars[l]));
                        }

                        objVar.Params = arrParams;
                        var d = eval(this.fnValueNeeded)(this, objVar, this.getRowIndex(), this.getTag());
                        strVar = sInfix.substr(m_iIndex, iIndex - m_iIndex + 1);
                        sInfix = sInfix.replace(strVar, d.toString());
                    }
                } // End region Focus varialbes with parameters
            }

            stktemp = [];
        } // End check for focus functions


        j = k = flag = 0;
        temp = ds1 = ds2 = "";
        this.clearStackOpt();
        this.m_sResult = this.ToPostfix(sInfix);//postfix 
        if (FCommon.String.isNullOrEmpty(this.m_sResult) == true)
        {
            return (0);
        }
        if (this.m_sResult == "NaN")
        {
            return (0);
        }

        for (i = 0; i < this.m_sResult.length; i++) {
            if (FCommon.String.includes(chOperators, this.m_sResult[i]))//if arith operator found
            {
                try
                {
                    ds1 = this.popStackOptValue(); // Pop the value from stack
                    if (this.m_sResult[i] == '#') {
                    }

                    if (this.m_sResult.charAt(i) == '!' || this.m_sResult.charAt(i) == ']' || this.m_sResult.charAt(i) == '[')//negation,floor,ceil
                    {
                        try
                        {
                            if(FConvert.isNumeric(ds1) == false)
                            {
                                if((dd1 = this.eVal(ds1)) == this.getDoubleMaxValue()) {
                                    var objVar = this.getEmptyVariableParObject();
                                    objVar.Var = ds1[0] == '-' ? ds1.substr(1) : ds1;
                                    dd1 = eval(this.fnValueNeeded)(this, objVar, this.getRowIndex(), this.getTag());
                                }

                                if (ds1.charAt(0) == '-')//0th char '-'
                                {
                                    dd1 *= -1;
                                }

                                if (dd1 == Number.NaN)
                                {
                                    return (Number.NaN);
                                }
                            }
                        }
                        catch (err)//if its varuable
                        {
                            this.m_sError = err.message;
                        }

                        this.TempResultForArithmeticOperation(dd1, 0, this.m_sResult[i]);//find result  & push the res to stack
                        continue;
                    }
                }
                catch (err) {
                    this.m_sError = err.message;
                    ds1 = "0";
                }

                try {
                    ds2 = this.popStackOptValue(); // pop the second operand
                }
                catch (err) {
                    this.m_sError = err.message;
                    ds2 = "0";
                }

                try
                {
                    if(FConvert.isNumeric(ds1) == false) {
                        if ((dd1 = this.eVal(ds1)) == this.getDoubleMaxValue()) {
                            var objVar = this.getEmptyVariableParObject();
                            objVar.Var = ds1[0] == '-' ? ds1.substr(1) : ds1;
                            dd1 = eval(this.fnValueNeeded)(this, objVar, this.getRowIndex(), this.getTag());
                        }
                            
                        if (ds1.charAt(0) == '-') {
                            dd1 *= -1;
                        }

                        if (dd1 == Number.NaN)
                        {
                            return (Number.NaN);
                        }
                    }
                    else {
                        dd1 = FConvert.toDecimal(ds1);
                    }
                }
                catch (err) {
                    //if its a variable
                    this.m_sError = err.message;
                }

                try {
                    if(FConvert.isNumeric(ds2) == false) {
                        if ((dd2 = this.eVal(ds2)) == this.getDoubleMaxValue()) {
                            var objVar = this.getEmptyVariableParObject();
                            objVar.Var = ds2[0] == '-' ? ds2.substr(1) : ds2;
                            dd2 = eval(this.fnValueNeeded)(this, objVar, this.getRowIndex(), this.getTag());
                        }


                        if (ds2.charAt(0) == '-') {
                            dd2 *= -1;
                        }

                        if (dd2 == Number.NaN)
                        {
                            return (Number.NaN);
                        }
                    }
                    else {
                        dd2 = FConvert.toDecimal(ds2);
                    }
                }
                catch (err) {
                    //variable
                    this.m_sError = err.message;
                }

                this.TempResultForArithmeticOperation(dd1, dd2, this.m_sResult[i]);
            }
            else
            {
                if (this.m_sResult.charAt(i) == '@')//eg:-1
                {
                    i++;
                    flag = 1;//- vsl
                    continue;
                }

                if (this.m_sResult.charAt(i) == '$')//eg:+1
                {
                    i++;
                    continue;
                }

                temp += this.m_sResult[i];
                for (k = 0; this.strarr[j] == ""; j++) ;//loop till the splitted value valid
                if (temp == this.strarr[j])//find the splitted values matches with temp
                {
                    if (flag == 1)//- val
                    {
                        flag = 0;
                        temp = "-" + temp;
                    }
                    this.pushStackOptValue(temp); // push the temp to stack
                    temp = "";
                    j++;
                }
            }
        }

        //last result should be in stack,stack must have only 1 value with it
        if (this.getStackOptCount() != 1)//morethan 1 value or 0
        {
            return (Number.NaN);//return nothing
        }

        ds1 = this.popStackOptValue(); // Pop the final result

        try
        {
            if (FConvert.isNumeric(ds1) == false) {
                if ((dd1 = this.eVal(ds1)) == this.getDoubleMaxValue()) {
                    var objVar = this.getEmptyVariableParObject();
                    objVar.Var = ds1[0] == '-' ? ds1.substr(1) : ds1;
                    dd1 = eval(this.fnValueNeeded)(this, objVar, this.getRowIndex(), this.getTag());
                }

                if (ds1.charAt(0) == '-') {
                    dd1 *= -1;
                }
            }
            else
            {
                dd1 = FConvert.toDecimal(ds1);
            }
        }
        catch (err) {
            //if its a var
            this.m_sError = err.message;
        }

        return (dd1);
    },

    this.dummy = function () { };
};

