var FocusDataStructs = {
    getIdNamePairObject: function () {
        var obj = {};

        obj.ID = 0; // int
        obj.Name = ""; // string
        obj.Tag = null; // object

        return (obj);
    },

    getIdValuePairObject: function() {
        var obj = {};

        obj.ID = 0;
        obj.Value = null; // object

        return (obj);
    },

    getComboDataObject: function() {
        var obj = {};

        obj.ID = 0;
        obj.Name = ""; // string

        return (obj);
    },

    getTranMasterInfoObject: function () {
        var obj = {};

        obj.DataType = 0 // int
        obj.Filter = ""; // string
        obj.IsBodyField = false; // bool
        obj.MasterType = 0; // int

        return (obj);
    },

    getReportFilterObject: function() {
        var obj = {};

        obj.FilterId = 0; // int
        obj.FilterGroupId = 0; // int
        obj.FieldId = 0; // int
        obj.SubParentId = 0; // int
        obj.ParentId = 0; // int
        obj.IsGroup = false; // bool
        obj.Operator = 0; // enum Operator
        obj.CompareWith = 0; // enum CompareWith
        obj.Conjuction = 0; // enum Conjuction 
        obj.CompareValue = ""; // string
        obj.CompareText = ""; // string
        obj.FilterType = 0; // enum _FilterType 
        obj.DataType = 0; // enum MasterDataType 

        return (obj);
    },

    getBillBaseInfoObject: function () {
        var obj = {};

        obj.BalanceBaseAmount = 0; // decimal
        obj.BalanceLocalAmount = 0; // decimal
        obj.BalanceTransactionAmount = 0; // decimal
        obj.OrginalBaseAmount = 0; // decimal
        obj.OrginalLocalAmount = 0; // decimal
        obj.OrginalTransactionAmount = 0; // decimal

        return (obj);
    },

    getBillAdjustmentObject: function () {
        var obj = {};

        obj.BillBaseInfo = FocusDataStructs.getBillBaseInfoObject();
        obj.CurrentRow = false; // bool
        obj.dActualDiscountAmount = 0; // decimal
        obj.dDiscountAmount = 0; // decimal
        obj.dDiscountPercentage = 0; // decimal
        obj.dDueDate = 0; // int
        obj.iAccount = 0; // int
        obj.iAPTag = 0; // int
        obj.iARTag = 0; // int
        obj.iBodyId = 0; // int
        obj.iCode = 0; // int
        obj.iCurrencyId = 0; // int
        obj.iFlag = 0; // AdjustmentFlag
        obj.iLocalCurrencyId = 0; // int
        obj.iMasterTypeId = 0; // int
        obj.iPayAccountId = 0; // int
        obj.iProduct = 0; // int
        obj.iRef = 0; // long
        obj.iRefType = 0; // byte
        obj.iTag = 0; // int
        obj.iYearId = 0; // byte
        obj.mAAdIDBaseCurrency = 0; // decimal
        obj.mAAdIDInvoiceCurrency = 0; // decimal
        obj.mAAdIDLocalCurrency = 0; // decimal
        obj.mAAIDBaseCurrency = 0; // decimal
        obj.mAAIDInvoiceCurrency = 0; // decimal
        obj.mAAIDLocalCurrency = 0; // decimal
        obj.MaintainInInviceCurrency = false; // bool
        obj.mBAIDConversionRate = 0; // decimal
        obj.mBAIDInvoiceCurrency = 0; // decimal
        obj.mBAIDLocalConversionRate = 0; // decimal
        obj.mBAIDLocalCurrency = 0; // decimal
        obj.mBATDBaseCurrency = 0; // decimal
        obj.mBATDBillCurrency = 0; // decimal
        obj.mBATDConversionRate = 0; // decimal
        obj.mBATDLocalConversionRate = 0; // decimal
        obj.mBATDLocalCurrency = 0; // decimal
        obj.mExchangeDifference = 0; // decimal
        obj.mLocalExchangeDiff = 0; // decimal
        obj.NegetiveAmount = false; // bool
        obj.OriginalAmount = 0; // decimal
        obj.OriginalAmountTC = 0; // decimal
        obj.PaymentTerm = 0; // int
        obj.Select = false; // bool
        obj.sNarration = ""; // string
        obj.sReference = ""; // string

        return (obj);
    },

    getAdjustBillsObject: function () {
        var obj = {};

        obj.AccountType = 0; // enum AccountTypes
        obj.arrAdjustedReferences = [];  // BillAdjustment[]
        obj.arrBreakupByTag = []; // BillAdjustment[]
        obj.Customer = ""; // String
        obj.CustomerId = 0; // int
        obj.Narration = ""; // String
        obj.PositiveAmount = false; // bool

        return (obj);
    },

    getLinkDefinitionObject: function () {
        var obj = null;

        obj.IsCheckStock = false; // bool
        obj.IsDontSelectPartial = false; // bool
        obj.IsLinkOptional = false; // bool
        obj.LinkCannotExceedBaseValue = false; // bool
        obj.LinkId = 0; // int
        obj.LoadBaseDocDtlsAtLinking = false; // bool
        obj.LoadField = 0; // int
        obj.LoadPendingDoc = 0; // int
        obj.Mappings = []; // IdNamePair[]
        obj.RaiseLinkDoc = false; // bool
        obj.UseLinkForLoading = false; // bool

        return (obj);
    },

    getBatchDataObject: function () {
        var obj = {};

        obj.BatchId = 0; // long
        obj.BatchNo = ""; // string
        obj.BatchRate = 0; // decimal
        obj.BodyId = 0; // int
        obj.ExpDate = 0; // Date
        obj.FromReservation = false; // bool
        obj.InvTagId = 0; // int
        obj.MfgDate = 0; // Date
        obj.Qty = 0; // decimal
        obj.Value1 = 0; // decimal
        obj.Value2 = 0; // decimal

        return (obj);
    },

    getReservationsObject: function () {
        var obj = {};

        obj.BaseUnitName = ""; // string
        obj.BatchId = 0; // long
        obj.BatchNo = ""; // string
        obj.Bins = []; // BinsQuantity
        obj.bPendingSales = false; // bool
        obj.DueDate = 0; // Date
        obj.InvTagId = 0; // int
        obj.InvTagName = ""; // string
        obj.iTransactionId = 0; // long
        obj.ProductCode = ""; // string
        obj.ProductId = 0; // int
        obj.ProductName = ""; // string
        obj.Quantity = 0; // decimal
        obj.ReqTransactionId = 0; // long
        obj.ReserveByBatch = false; // bool
        obj.ReserveByBin = false; // bool
        obj.ReserveByRMA = false; // bool
        obj.ReserveType = 0; // int

        return (obj);
    },

    getBinsQuantityObject: function () {
        var obj = {};

        obj.Batch = ""; // string
        obj.BatchId = 0; // long
        obj.BinId = 0; // int
        obj.BinName = ""; // string
        obj.BodyId = 0; // int
        obj.Distance = 0; // int
        obj.ExpDate = 0; // int
        obj.Item = 0; // int
        obj.ItemCapacity = 0; // int
        obj.Level = 0; // int
        obj.MfgDate = 0; // int
        obj.Quantity = 0; // decimal
        obj.UnitId = 0; // int

        return (obj);
    },

    getStockToReleaseObject: function () {
        var obj = {};

        obj.BaseTransactionId = 0; // long
        obj.Quantity = 0; // decimal

        return (obj);
    }

};