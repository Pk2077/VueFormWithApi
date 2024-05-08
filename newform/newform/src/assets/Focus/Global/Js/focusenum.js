var MasterDataType = (function () {
    var private = {
        'TEXT': 0,
        'NUMBER': 1,
        'BOOLEAN': 2,
        'DATETIME': 3,
        'DATE': 4,
        'TIME': 5,
        'FRACTION': 6,
        'PICTURE': 7,
        'STRINGLIST': 8,
        'NUMBERLIST': 9,
        'DOCUMENTVIEWER': 10,
        'UPDATEDTIME': 11,
        'MASTER': 12,
        'BIGNUMBER': 13,
        'EXTERNALTABLE': 14,
        'SMALLNUMBER': 15,
        'TINYNUMBER': 16
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var AccountTypes = (function () {
    var private = {
        'NONE': 0,
        'CASH': 1,
        'BANK': 2,
        'SALES': 3,
        'PURCHASES': 4,
        'CUSTOMER': 5,
        'VENDOR': 6,
        'CUSTOMERVENDOR': 7,
        'ASSETS': 8,
        'LIABILITIES': 9,
        'INCOME': 10,
        'EXPENSES': 11,
        'PETTYCASHEXPENSES': 12,
        'TRAVELANDENTERTAINMENTEXPENSES': 13,
        'SELLINGEXPENSES': 14,
        'MANUFACTURINGEXPENSES': 15,
        'TDS': 16,
        'TAXESPAYABLE': 17,
        'GENERALANDADMINISTRATION': 18,
        'DEPRECIATIONANDAMORTIZATION': 19,
        'OTHEREXPENSES': 20,
        'CONTROL': 21,
        'COST': 22,
        'TREASURYSTOCK': 23,
        'SHORTTERMINVESTMENTS': 24,
        'REVENUESNOTPRODUCINGWORKINGCAPITAL': 25,
        'SINKINGFUNDPAYABLE': 26,
        'SALESRETURNSANDDISCOUNTS': 27,
        'PROPERTYPLANTANDEQUIPMENT': 28,
        'PROJECTOPERATIONEXPENSE': 29,
        'PREFERREDDIVIDENDS': 30,
        'PROSPECT': 31,
        'INVENTORY': 32,
        'FIXEDASSETS': 33,
        'TRADINGACCOUNT': 34,
        'CASHPETTYCASH': 35,
        'EMPLOYEE': 36,
        'ASSETSLIABILITIES': 37,
        'INCOMEEXPENSE': 38,
        'TRUSTRECEIPT': 39
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var RoundingType = (function () {
    var private = {
        'NONE': 0,
        'NEAREST': 1,
        'DOWN': 2,
        'UP': 3
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var CallingType = (function () {
    var private = {
        'FIFO': 0,
        'ALWAYSNEWREF': 1,
        'Manual': 2
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var VWInventoryFields = (function () {
    var private = {
        'ALLOWEXPIREDBATCHESTOSELECT': 0,
        'DONTINPUTBATCHNUMBERS': 1,
        'LOADBATCHESBEFOREQTY': 2,
        'RESERVESTOCKBYBATCHES': 3,
        'APPLYRATESCHEMES': 4,
        'PICKFREESCHEMESAFTREVERYLINE': 5,
        'DISPLAYUNITNAMEBEFOREEVERYQTY': 6,
        'DONTINPUTPRODUCTS': 7,
        'DONTINPUTQTYANDRATE': 8,
        'DONTPOPUPBINSELECTION': 9,
        'HIDERATEANDGROSS': 10,
        'HIDERATEANDGROSSFORNORMALUSERS': 11,
        'HIREPURCHASEBEHAVIOR': 12,
        'INPUTASCOUNTERBILL': 13,
        'INPUTBINLOCATION': 14,
        'INPUTPRODUCTBYATTRIBUTE': 15,
        'PICKRATEFROMORDER': 16,
        'QCREQUIREDFORTHISDOC': 17,
        'RECALCULATETHERATEINRECEIPTFROMPRODUCTIONONSAVING': 18,
        'RESTRICTTHEITEMFROMBEINGREPEATEDINENTRY': 19,
        'SHOWCUSTOMERASSIGNEDPRODUCTS': 20
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var _RowType = (function () {
    var private = {
        'DEFAULT': 0,
        'ACCOUNTTOPOST': 1,
        'RAISERECEIPT': 2,
        'PAYMENTTERMS': 3,
        'APPROPRIATED': 4,
        'COGS': 5,
        'EXCHANGEDIFF': 6
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var VTFIELDID = (function () {
    var private = {
        'FDF_DOCUMENTNO': 1,
        'FDF_DATE': 2,
        'FDF_CODE': 3,
        'FDF_BOOKNO': 4,
        'FDF_AGAINSTINVOIVENO': 5,
        'FDF_DUEDATE': 6,
        'FDF_BODYDUEDATE': 7,
        'FDF_PRODBATCH': 8,
        'FDF_BOMSIZE': 9,
        'FDF_HEADERCURRENCY': 10,
        'FDF_EXCHANGERATE': 11,
        'FDF_BODYCODE': 12,
        'FDF_BODYBATCHNO': 13,
        'FDF_BODYCURRENCY': 14,
        'FDF_BODYEXCHANGERATE': 15,
        'FDF_BODYAMOUNT': 16,
        'FDF_CREDITDAYSBASEDDISCOUNT': 17,
        'FDF_BODYJRNDEBIT': 18,
        'FDF_BODYJRNCREDIT': 19,
        'FDF_UPDATESTOCKS': 20,
        'FDF_RAISECASHCONTRA': 21,
        'FDF_RESERVEQUANTITY': 22,
        'FDF_BODYPRODUCT': 23,
        'FDF_BODYUNITS': 24,
        'FDF_BODYRCTISSUE': 25,
        'FDF_BODYQUANTITY': 26,
        'FDF_BODYRATE': 27,
        'FDF_BODYGROSS': 28,
        'FDF_LCNUMBER': 29,
        'FDF_JOOTEINPUT': 30,
        'FDF_RCTISSUESELECTION': 31,
        'FDF_PMTTERMS': 32,
        'FDF_HEADERTAG': 33,
        'FDF_BODYTAG': 34,
        'FDF_LINK': 35,
        'FDF_MFGDATE': 36,
        'FDF_EXPDATE': 37,
        'FDF_RMANO': 38,
        'FDF_BODYBOOKNO': 39,
        'FDF_UPDATEFA': 40,
        'FDF_BODYALTQUANTITY': 41,
        'FDF_BRS': 42,
        'FDF_CANCELLED': 43,
        'FDF_CHECKED': 44,
        'FDF_COGS': 45,
        'FDF_CURRRENCY_ID': 46,
        'FDF_ENTRY_ID': 47,
        'FDF_FATAG': 48,
        'FDF_SCREEN_AMOUNT': 49,
        'FDF_SCREEN_NET_AMOUNT': 50,
        'FDF_INVTAG': 51,
        'FDF_ISSETNAME': 52,
        'FDF_ORIGINAL_AMOUNT': 53,
        'FDF_ORIGINAL_GROSS': 54,
        'FDF_ORIGINAL_RATE': 55,
        'FDF_POSTCASHENTRY': 56,
        'FDF_QC_DONE': 57,
        'FDF_QC_PENDING': 58,
        'FDF_QUANTITY_IN_BASE': 59,
        'FDF_SPECIAL_MEANING': 60,
        'FDF_SUSPENDED': 61,
        'FDF_SUSPENDED_BASE_SAVED': 62,
        'FDF_SUSPENDED_LINK_SAVED': 63,
        'FDF_SUSPENDED_RESERVATION': 64,
        'FDF_SUSPENDED_UPDATE_FA': 65,
        'FDF_SUSPENDED_UPDATE_STOCK': 66,
        'FDF_STOCK_VALUE': 67,
        'FDF_TAG_ID': 68,
        'FDF_TAG_VALUE': 69,
        'FDF_TDS_CERT_PREPARED': 70,
        'FDF_TDS_PAID': 71,
        'FDF_TYPE': 72,
        'FDF_USER_ID': 73,
        'FDF_AMOUNT1': 74,
        'FDF_BODYNET': 75,
        'FDF_SERIAL_NO': 76,
        'FDF_BATCH_QUANTITY': 77,
        'FDF_MODIFIED_BY': 78,
        'FDF_CREATED_DATE': 79,
        'FDF_TIME': 80,
        'FDF_MODIFIED_DATE': 81,
        'FDF_MODIFIED_TIME': 82,
        'FDF_REFERENCE': 83,
        'FDF_BINS2': 84,
        'FDF_BINS': 85,
        'FDF_HEADERINVTAG': 86,
        'FDF_BODYINVTAG': 87,
        'FDF_DEPTAPPROP': 88,
        'FDF_MAXQTYRELEASE': 89,
        'FDF_TRANSACTIONID': 90,
        'FDF_LOCAL_EXCHANGERATE': 92,
        'FDF_LOCAL_NETAMOUNT': 93,
        'FDF_LOCAL_GROSSAMOUNT': 94,
        'FDF_AUTH_STATUS': 95,
        'FDF_MEMBER_POINT': 100,
        'FDF_REDEEMED_POINT': 101,
        'FDF_POINT_OPENING_BALANCE': 102,
        'FDF_EARNED_POINT': 103,
        'FDF_POINT_EXPIRY_DATE': 104,
        'FDF_POINT_STATUS': 105,
        'FDF_POINT_REVERSAL': 106,
        'FDF_POINT_BALANCE': 107,
        'FDF_BATCHRATE': 108,
        'FDF_BATCHRATE1': 109,
        'FDF_BATCHRATE2': 110,
        'FDF_FORMULAFIELD': 111,
        'FDF_REFERENCE2': 112,
        'FDF_AVERAGERATE': 113,
        'FDF_VOUCHERTYPE': 114,
        'FDF_BALANCERELEASEQTY': 115,
        'FDF_PRINTCOUNT': 116,
        'FDF_REVISION_NO': 117,
        'FDF_SCHEME_NAME': 118,
        'FDF_SCHEME_TYPE': 119,
        'FDF_SCHEME_PROMOTIONTYPE': 120,
        'FDF_SCHEME_ITEM': 121,
        'FDF_SCHEME_FREEQTY': 122,
        'FDF_SCHEME_DISCOUNT': 123,
        'FDF_SCHEME_IMPLEMENTATIONTYPE': 124,
        'FDF_SCHEME_PAYMENTTYPE': 125,
        'FDF_SCHEME_BANKCARDNAME': 126,
        'FDF_MASTER_ALIAS': 127,
        'FDF_MASTER_LEVEL': 128,
        'FDF_RFID': 129,
        'FDF_SKID': 130,
        'FDF_BUYING_RATE': 131,
        'FDF_SELLING_RATE': 132,
        'FDF_REFERENCE_DETAILS': 133,
        'FDF_REFERENCE_NUMBER': 134,
        'FDF_REFERENCE_DATE': 135,
        'FDF_REFERENCE_AMOUNT': 136,
        'FDF_REFERENCE_BILL_NUMBER': 137,
        'FDF_REFERENCE_DOC_NUMBER': 138,
        'FDF_REFERENCE_DUE_DATE': 139,
        'FDF_REFERENCE_ACCOUNT': 140,
        'FDF_REFERENCE_BASE_AMOUNT': 141,
        'FDF_REFERENCE_LOCAL_AMOUNT': 142,
        'FDF_BASE_LINK_DOC_NUMBER': 143,
        'FDF_BASE_LINK_DOC_DATE': 144,
        'FDF_LOCEXCHANGERATE': 145,
        'FDF_RESERVATIONBATCHNO': 146,
        'FDF_MODIFIED_BY_ROLE': 147,
        'FDF_USERVAL1': 148,
        'FDF_USERVAL2': 149,
        'FDF_USERVAL3': 150,
        'FDF_USERVAL4': 151,
        'FDF_USERVAL5': 152,
        'FDF_AUTH_BYUSER': 153,
        'FDF_FOOTERVALUE': 154,
        'FDF_LOCALFOOTERVALUE': 155,
        'FDF_TRANFOOTERVALUE': 156,
        'FDF_VOUCHERNAME': 157,
        'FDF_VOUCHERABBR': 158,
        'FDF_DEFSTAT': 159,
        'FDF_MASTER_BUDGET': 160,
        'FDF_AUTH_REMARKS': 161,
        'FDF_BODYBINS': 162,
        'FDF_BASE_LINK_STATUS': 163,
        'FDF_AUTH_DATE': 164,
        'FDF_AUTH_TIME': 165,
        'FDF_EMAILCOUNT': 166,
        'FDF_PROD_PROCESS': 167,
        'FDF_OP_STOCK_QUANTITY': 168,
        'FDF_OP_STOCK_VALUE': 169,
        'FDF_PRODUCT_IMAGE': 170
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var VTFIELDFLAG = (function () {
    var private = {
        'DEFAULT': 0,
        'TOFLDID': 16777215,
        'LAY_BODY': 16777216,
        'SCR_BODY': 33554432,
        'LAY_HDR': 67108864,
        'SCR_FTR': 134217728,
        'MASTER_HDR': 268435456,
        'MASTER_BODY': 536870912,
        'OVERALL_VAR': 1073741824,
        'TOFLDFLAG': 2130706432
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var VTTYPE = (function () {
    var private = {
        'OPBAL': 256,
        'IOPBA': 512,
        'PURCH': 768,
        'PRREC': 1024,
        'PRDRT': 1056,
        'MATRN': 1280,
        'JWREC': 1536,
        'SARET': 1792,
        'IEXCE': 2048,
        'PQUOT': 2304,
        'PORDR': 2560,
        'WDONE': 2816,
        'IIDST': 3072,
        'SALES': 3328,
        'POSSALES': 3331,
        'JOURN': 3584,
        'DEBNT': 3840,
        'CRDNT': 4096,
        'IDJRN': 4352,
        'CASHR': 4608,
        'CASHP': 4864,
        'PETIC': 5120,
        'ISHOR': 5376,
        'SORDR': 5632,
        'MEMOR': 5888,
        'DLVCH': 6144,
        'PURET': 6400,
        'PRDIS': 6656,
        'JWISS': 6912,
        'MEMOP': 7168,
        'SQUOT': 7424,
        'JORDR': 7680,
        'REQSN': 7936,
        'REQFQ': 8192,
        'FRXJV': 8448,
        'NJOURN': 8704,
        'WMSASN': 8960,
        'WMSRTS': 9216,
        'WMSPUTAWAY': 9472,
        'WMSPUTAWAYCONF': 9728,
        'WMSMOVEREQ': 9984,
        'WMSMOVECONF': 10240,
        'WMSREPLREQ': 10496,
        'WMSREPLCONF': 10752,
        'WMSPICKLIST': 11008,
        'WMSPICKCONF': 11264,
        'WMSDISPREQ': 11520,
        'WMSDISPCONF': 11776,
        'WMSSARET': 12032,
        'WMSSTKCHK': 12288,
        'VOUCHERMASK': 65280
    };

    return {
        get: function (name) { return private[name]; }
    };
})();

var _AuthStatus = (function () {
    var private = {
        'PENDING': 0,
        'AUTHORIZED': 1,
        'REJECTED': 2,
        'STOPPED': 3,
        'EDITED': 4
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var LinkStatus = (function () {
    var private = {
        'OPENED': 0,
        'CLOSED': 1,
        'PARTIAL': 2
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var InvTagInVoucher = (function () {
    var private = {
        'NONE': 0,
        'INVTAGINHEADER': 1,
        'INVTAGINBODY': 2
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var AdjustmentFlag = (function () {
    var private = {
        'NONE': 0,
        'PAYMENTTERMSADJUSTMENTS': 1
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var SecurityActions = (function () {
    var private = {
        'ACCESS': 1,
        'ADD': 2,
        'EDIT': 3,
        'COPY': 4,
        'SEARCH': 5,
        'DELETE': 6,
        'PRINT': 7,
        'REPRINT': 8,
        'PRINTBARCODE': 9,
        'PRINTUNAUTHORIZEDDOCUMENTS': 10,
        'VIEW': 11,
        'GROUP': 12,
        'EXPORT': 13,
        'EDITDOCSBYOTHER': 14,
        'EDITDOCSCHECKED': 15,
        'EDITDOCSRECONCILED': 16,
        'EDITDOCSAUTHBYHIGHERUPS': 17,
        'ENTERDOCSTHATEXCEEDLIMIT': 18,
        'ENTERDOCSCASHORBANKBALNEG': 19,
        'EDITDOCSREPRINTED': 20,
        'ACCESSTHROUGHAPI': 21,
        'ALWAYSSUSPENDONSAVING': 22,
        'CHANGEPRINTLAYOUT': 23,
        'EMAILREPORT': 24,
        'EDITPRINTLAYOUT': 25,
        'VIEWCUSTOMIZEDLAYOUT': 26,
        'ADDCUSTOMIZEDLAYOUT': 27,
        'SCHEDULE': 28,
        'CUSTOMIZE': 29,
        'AUTHORIZE': 43,
        'REJECT': 76,
        'STOP': 204,
        'MODIFYSETTINGS': 206,
        'SHOWHOMESCREEN': 156,
        'VIEWENTEDEDBYOTHERS': 218,
        'CLOSELINKS': 219,
        'SAVEVERSION': 247,
        'POSTINGDETAILS': 258,
        'SUSPEND': 270,
        'HIDE': 282,
        'AMEND': 309,
        'CUSTOMIZELINK': 310
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var VoucherMode = (function () {
    var private = {
        'NONE': 0,
        'APPROVED': 1,
        'PENDING': 2,
        'SUSPENDED': 3,
        'REJECTED': 4,
        'STOPPED': 5,
        'PARTIAL': 6
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();


var ProdAccountTypes = (function () {
    var private = {
        'STOCKACCOUNT': 0,
        'SALESACCOUNT': 1,
        'EXPIRYDAYS': 2
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var RD_DataSourceType = (function () {
    var private = {
        'DEFAULT': 0,
        'QUERY': 1,
        'VIEW': 2,
        'EXCEL': 3,
        'XML': 4,
        'REPORTS': 5,
        'CUBES': 6,
        'STANDARD SUMMARY': 11,
        'STANDARD': 12
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var RD_ReportType = (function () {
    var private = {
        'STANDARD' : 0,
        'DETAIL' : 1,
        'CUBES' : 2,
        'ANALYZE' : 3,
        'VOUCHER' : 4
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var RD_GraphType = (function () {
    var private = {
        'Bar': 0,
        'Area': 1,
        'Line': 2,
        'Curve': 3,
        'Pie': 4,
        'Scatter': 5,
        'Bubble': 6,
        'Radar': 7,
        'Polar': 8,
        'Doughnut': 9,
        'Gantt': 10,
        'OpenHighLowClose': 11,
        'Candlestick': 12,
        'HighLowClose': 13,
        'TreeMap': 14,
        'CurveArea': 15,
        'Step': 16,
        'Pyramid': 17,
        'Cube': 18,
        'Funnel': 19,
        'Surface': 20
    };

    return {
        get: function (name) {
            if (FCommon.String.isNullOrEmpty(name) == false) {
                return(private[name]);
            }

            return(private);
        }
    };
})();

var RDFIELDID = (function () {
    var private = {
        'VIRTUAL': -100,
        'ALIAS': -6,
        'GROUPING': -5,
        'BALANCE': -4,
        'PARTICULAR': -3,
        'PROOGRAMMABLE': -2,
        'ROWHEADER': 0
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var RD_AggregateFunction = (function () {
    var private = {
        'NONE': 0,
        'SUM': 1,
        'AVERAGE': 2,
        'MAXIMUM': 3,
        'MINIMUM': 4,
        'COUNT': 5
    };
    return {
        get: function (name) { return private[name.toUpperCase()]; },

        getText: function (iValue) {
            switch (parseInt(iValue)) {
                case 0:
                    return ("NONE");
                case 1:
                    return ("SUM");
                case 2:
                    return ("AVERAGE");
                case 3:
                    return ("MAXIMUM");
                case 4:
                    return ("MINIMUM");
                case 5:
                    return ("COUNT");
                default:
                    return ("");
            }
        }
    };
})();

var _FunctionType = (function () {
    var private = {
        'FORMULA': 0,
        'FUNCTION': 1,
        'FORMULAFUNCTION': 2
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var HorizontalAlignment = (function () {
    var private = {
        'LEFT': 0,
        'CENTER': 1,
        'RIGHT': 2
    };

    return {
        get: function (name) { return private[name]; }
    };
})();

var ColumnSign = (function () {
    var private = {
        'NONE': 0,
        '-/+': 1,
        'DR/CR': 2,
        '(BRACKET)': 3
    };

    return {
        get: function (name) { return private[name]; }
    }
})();

var RD_CompareWith = (function () {
    var private = {
        'VALUE': 0,
        'FORMULA': 1,
        'FIELD': 2,
        'DATERANGE': 3
    };

    return {
        get: function (name) { return private[name]; }
    }
})();

var RD_Conjuction = (function () {
    var private = {
        'WHERE': 0,
        'WHEREOPEN': 1,
        'AND': 2,
        'ANDOPEN': 3,
        'CLOSEAND': 4,
        'CLOSEANDOPEN': 5,
        'OR': 6,
        'OROPEN': 7,
        'CLOSEOR': 8,
        'CLOSEOROPEN': 9,
        'CLOSE': 10,
        'ONLY': 11
    };

    return {
        get: function (name) { return private[name]; }
    }
})();

var RD_FilterType = (function () {
    var private = {
        'REPORT': 0,
        'COLUMN': 1,
        'ROW': 2,
        'INVOICEAREA': 3,
        'INVOICECOLUMN': 4
    };

    return {
        get: function (name) { return private[name]; }
    }
})();

var RD_Operator = (function() {
    var private = {
        'EQUALTO': 0,
        'NOTEQUALTO': 1,
        'LESSTHAN': 2,
        'GREATERTHAN': 3,
        'LESSTHANOREQUALTO': 4,
        'GREATERTHANOREQUALTO': 5,
        'ISBLANK': 6,
        'ISNOTBLANK': 7,
        'BEGINWITH': 8,
        'DOESNOTBEGINWITH': 9,
        'CONTAINING': 10,
        'NOTCONTAINING': 11,
        'ENDWITH': 12
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    }
})();

var Module = (function () {
    var private = {
        'NONE': 0,
        'COREMASTERS': 1,
        'CORETRANSACTIONS': 2,
        'CRM': 3,
        'MRP': 4,
        'QUALITY': 5,
        'FIXASSETS': 6,
        'MAINTENANCE': 7,
        'PAYROLL': 8,
        'WMS': 9,
        'POS': 10,
        'WINTAX': 11,
        'TDS': 12,
        'ARMS': 13,
        'INVENTORY': 14,
        'SECURITY': 15,
        'PRODUCTION': 16
    };

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    }

})();

var FilterConjuction = (function () {
    var private={
        "WHERE" : 0,
        "WHERE (" : 1,
        "AND" : 2,
        "AND (" : 3,
        ") AND": 4,
        ") AND (" : 5,
        "OR" : 6,
        "OR (" : 7,
        ") OR": 8,
        ") OR (": 9,
        ")": 10
    }
    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var FilterOperator = (function () {
    var private = {
        "Equalto": 0,
        "NotEqualto": 1,
        "Lessthan": 2,
        "Greaterthan": 3,
        "Lessthanorequalto": 4,
        "Greaterthanorequalto": 5,
        "IsBlank": 6,
        "IsNotBlank": 7,
        "BeginWith":8,
        "DoesNotBeginWith": 9,
        "Contains": 10
    }
    return {
        get: function (name) { return private[name]; }
    };
})();

var GroupType = (function () {
    var private = {
        "NodeOnly": 0,
        "GroupOnly": 1,
        "AllData": 2,
        "NodeAndAtrribGroup": 3
    }
    return {
        get: function (name) { return private[name]; }
    };
})();

var LoadTransactionBy = (function () {
    var private = {
        "HEADERID": 0,
        "BODYID": 1,
        "TRANSACTIONID": 2
    }
    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var TransactionSetType = (function () {
    var private = {
        'NONE': 0,
        'ACCOUNTINGTRANSACTIONS': 1,
        'ACCOUNTINGTRANSACTIONSOFANACCOUNT': 2,
        'ACCOUNTINGTRANSACTIONSOFACCOUNTINGTAG': 3,
        'ACCOUNTINGTRANSACTIONSOFINVENTORYTAG': 4,
        'ACCOUNTINGTRANSACTIONSOFATAG': 5,
        'ACCOUNTINGTRANSACTIONSOFSELECTEDACCOUNTS': 6,
        'ALLACCOUNTINGTRANSACTIONS': 7,
        'ALLACCOUNTS': 8,
        'ALLACCOUNTSTAGWISE': 9,
        'ALLFIXEDASSETS': 10,
        'ALLPRODUCTS': 11,
        'ALLPRODUCTSTAGWISE': 12,
        'ALLTRANSACTIONSOFDOCUMENTCLASS': 13,
        'ALLTRANSACTIONSOFDOCUMENTTYPE': 14,
        'INVENTORYTRANSACTIONS': 15,
        'INVENTORYTRANSACTIONSOFAPRODUCT': 16,
        'INVENTORYTRANSACTIONSOFACCOUNTINGTAG': 17,
        'INVENTORYTRANSACTIONSOFINVENTORYTAG': 18,
        'INVENTORYTRANSACTIONSOFATAG': 19,
        'INVENTORYTRANSACTIONSOFSELECTEDPRODUCTS': 20,
        'BILLREFERENCE': 21,
        'PENDINGLINKS': 22    
    }
    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var MessagesToUI =  (function () {
    var private = {
        Blank: 0,
        NegativeStockStop: 1,
        NegativeStockWarn: 2,
        NegativeStockApproval: 3,
        NegativeCashStop: 4,
        NegativeCashWarn: 5,
        NegativeCashApproval: 6,
        CreditLimitExceededWarn: 7,
        CreditLimitExceededApproval: 8,
        CreditLimitExceededStop: 9,
        OverDueBillsWarn: 10,
        OverDueBillsApproval: 11,
        OverDueBillsStop: 12,
        VoucherLinked: 13,
        LCError: 14,
        BillwiseCannotChangeAmount: 15,
        NegativeBudgetWarn: 16,
        NegativeBudgetApproval: 17,
        NegativeBudgetStop: 18,
        DuplicateBatch: 19,
        NoCogsAccount: 20,
        LinkExhausted: 21,
        BaseAlreadyLinked: 22,
        TagMissing: 23,
        ReorderLevelApproval: 24,
        ReorderLevelStop: 25,
        ReorderLevelWarn: 26,
        NoFutureTrans: 27,
        CannotAddAfter: 28,
        CannotEditAfter: 29,
        CannotAddAfterCutoff: 30,
        CannotEditAfterCutoff: 31,
        BudgetNotDefined: 32,
        RmaUsed: 33,
        DocDateCantBePrior: 34,
        BatchUsed: 35,
        CantSuspendBillsAlreadyAdjusted: 36,
        CantEditForexJV: 37,
        BillwiseCannotChangeCustomer: 38,
        BillwiseCannotChangeAccType: 39,
        UnitConversionNotDefined: 40,
        BillwiseBalanceDoesNotExist: 41,
        BaseNotFoundForCogs: 42,
        DemoTransLimit: 43,
        BillwiseCannotChangeDept: 44,
        WriteLock: 45,
        BatchNotAvailable: 46,
        RMANotAvailable: 47,
        RMANotUnique: 48,
        LCErrorDeletion: 49,
        DrCrRequiredFailed: 50,
        LinkBaseClosed: 51,
        UniqueConstraintViolated: 52,
        Mutex: 53,
        ErrorInQC: 54,
        BaseLinkDate: 55,
        DuplicateRMA: 56,
        NoEditRight: 57,
        BinUsed: 58,
        DuplicateDocNo: 59
    };

    return {
        get: function (name) { return private[name]; }
    };
})();

var _FieldType = (function () {
    var private = {
        "NORMAL": 0,
        "MASTER": 1,
        "EXTRAFIELDS": 2
    }
    return {
        get: function (name) { return private[name]; }
    };
})();

var ReportInputType = (function () {
    var private = {
        "NUMBER": 1,
        "TEXT": 2,
        "DATERANGE": 3,
        "ASONDATE": 4,
        "COMBOBOX": 5,
        "TIME": 6,
        "CHECKBOX": 7,
        "FRACTION": 8,
        "MASTER": 9,
        "TABLE": 10,
        "POPUPBUTTON": 11
    }
    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var ProductType = (function () {
    var private = {
        "NONE": 0,
        "SERVICE": 1,
        "RAWMATERIAL": 2,
        "INTERMEDIATEPRODUCT": 3,
        "FINISHEDGOODS": 4,
        "NONSTOCKITEM": 5,
        "MODIFIER": 6,
        "PRTCONSUMABLE": 7,
        "PRTTOOLS": 8
    }
    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var ConjunctionType = (function () {
    var private = {
        "ONLY": 0,
        "AND": 1,
        "OR": 2
    }
    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var RuleOperators = (function () {
    var private = {
        "EQUALTO": 0,
        "NOTEQUAL": 1,
        "LESSTHEN": 2,
        "GREATERTHAN": 3,
        "LESSTHANEQUAL": 4,
        "GREATERTHANEQUAL": 5,
        "ISPRESENT": 6,
        "ISNOTPRESENT": 7,
        "ISBLANK": 8,
        "ISNOTBLANK": 9,
        "BEGINSWITH": 10,
        "DOESNOTBEGINWITH": 11,
        "MATCHPATERN": 12,
        "DOESNOTMATCHPATERN": 13,
        "NEGATION": 14
    }
    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var Masters_DataStructs_CompareWith = (function () {
    var private = {
        "NONE": 0,
        "VALUE": 1,
        "FIELD": 2,
        "FORMULA": 3
    }
    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var Focus_Common_DataStructs_FieldExternalModuleEvents = (function () {
    var private = {
        "ONENTER": 0,
        "ONLEAVE": 1,
        "ONVALUECHANGE": 2
    }
    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var Focus_Common_DataStructs_VoucherExternalModuleEvents = (function () {
    var private = {
        "ONBUTTON": 0,
        "BEFORELOAD": 1,
        "AFTERLOAD": 2,
        "BEFORESAVE": 3,
        "AFTERSAVE": 4,
        "BEFOREDELETE": 5,
        "BEFORECLOSE": 6,
        "LIMITEXCEEDED": 7,
        "ALT_F1": 8,
        "ALT_F2": 9,
        "ALT_F3": 10,
        "ALT_F4": 11,
        "ALT_F5": 12,
        "ALT_F6": 13,
        "ALT_F7": 14,
        "ALT_F8": 15,
        "ALT_F9": 16,
        "ALT_F10": 17,
        "ALT_F11": 18,
        "ALT_F12": 19,
        "ONTABADD": 21
    }
    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var Focus_Common_DataStructs_ModulesImplemented = (function () {
    var private = {
        "COREMASTER": 1,
        "CORETRANSACTION": 2,
        "CRM": 4,
        "MRP": 8,
        "QUALITY": 16,
        "FIXEDASSET": 32,
        "MAINTENANCE": 64,
        "PAYROLL": 128,
        "GST": 256,
        "WMS": 512,
        "POS": 1024,
        "WINTAX": 2048,
        "TDS": 4096,
        "AIM": 8192,
        "RESTAURANT": 16384,
        "VAT": 32768,
        "MRP1": 65536
    }
    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var Focus_Common_DataStructs_BillStatus = (function () {
    var private = {
        "NONE": 0,
        "PAID": 1,
        "UNPAID": 2,
        "PARTIAL": 3
    }
    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();

var Focus_Common_DataStructs_MasterTypeId = (function () {
    var private = {
        "ACCOUNT": 1,
        "PRODUCT": 2,
        "DEPARTMENT": 3,
        "WAREHOUSE": 4,
        "COSTCENTER": 5,
        "LOCATION": 6,
        "REGION": 7,
        "COUNTRY": 8,
        "STATE": 9,
        "CITY": 10,
        "UNITS": 11,
        "BINS": 12,
        "WORKCENTER": 305,
        "INSURANCE": 600,
        "FIXEDASSET": 601,
        "EMPLOYEE": 800,
        "DESIGNATION": 801,
        "DISCOUNTVOUCHERDEFINITION": 1007,
        "OUTLET": 1100,
        "COUNTER": 1101,
        "MEMBERTYPE": 1102,
        "GIFTVOUCHERDEFINITION": 1103,
        "CATEGORY": 1104,
        "BANKCARDTYPE": 1105,
        "MEMBER": 1106,
        "FLOOR": 1108,
        "SECTION": 1109,
        "RESTTABLE": 1110,
        "RESTGUEST": 1111,
        "VOIDREMARKS": 1112
    }

    return {
        get: function (name) { return private[name.toUpperCase()]; }
    };
})();