import constants from "./constants";

let utils ={
    oldTaxRegime:oldTaxRegime,
    roundOff:roundOffNearestTen,
    newTaxRegime:newTaxRegime,
    calculateSurcharge:calculateSurcharge,
    checkifEmptyField:checkifEmptyField
} ;


function oldTaxRegime(amount,age) {
    let tax = 0;

    if(amount<=500000){
        return tax;
    }

    if(age!==constants.SENIOR_CITIZEN){
        if (amount <= constants.NON_TAXABLE_OLD_TAX) {
            tax = 0;
        } else if (amount <= constants.FIRST_TAXABLE_OLD_TAX) {
            tax = (amount - constants.NON_TAXABLE_OLD_TAX) * 0.05;
        } else if (amount <= constants.SECOND_TAXABLE_OLD_TAX) {
            tax = (amount - constants.FIRST_TAXABLE_OLD_TAX) * 0.2 + constants.NON_TAXABLE_OLD_TAX * 0.05;
        } else {
            tax = (amount - constants.SECOND_TAXABLE_OLD_TAX) * 0.3 + constants.FIRST_TAXABLE_OLD_TAX * 0.2 + constants.NON_TAXABLE_OLD_TAX * 0.05;
        }
    }else{
        if (amount <= constants.NON_TAXABLE_OLD_TAX_60) {
            tax = 0;
        } else if (amount <= constants.FIRST_TAXABLE_OLD_TAX_60) {
            tax = (amount - constants.NON_TAXABLE_OLD_TAX_60) * 0.05;
        } else if (amount <= constants.SECOND_TAXABLE_OLD_TAX_60) {
            tax = (amount - constants.FIRST_TAXABLE_OLD_TAX_60) * 0.2 + (constants.FIRST_TAXABLE_OLD_TAX_60-constants.NON_TAXABLE_OLD_TAX_60) * 0.05;
        } else {
            tax = (amount - constants.SECOND_TAXABLE_OLD_TAX_60) * 0.3 + constants.FIRST_TAXABLE_OLD_TAX_60 * 0.2 + (constants.FIRST_TAXABLE_OLD_TAX_60-constants.NON_TAXABLE_OLD_TAX_60) * 0.05;
        }
    }

    return tax
}

function newTaxRegime(amount,age) {
    let tax = 0;
    
    if(amount<=700000){
        return tax;
    }
        if (amount <= 300000) {
            tax = 0;
        } else if (amount <= 600000) {
            tax = (amount - 300000) * 0.05;
        } else if (amount <= 900000) {
            tax = (amount - 600000) * 0.1 + 300000 * 0.05;
        } else if (amount <= 1200000) {
            tax = (amount - 900000) * 0.15 + 600000 * 0.1 + 300000 * 0.05;
        } else if(amount <= 1500000) {
            tax = (amount - 1200000) * 0.2 + 900000 * 0.15 + 600000 * 0.1 + 300000 * 0.05;
        }else{
            tax = (amount - 1500000) * 0.3 + 1200000 * 0.2 + 900000 * 0.15 + 600000 * 0.1 + 300000 * 0.05;
        }
    return tax
}

function roundOffNearestTen(number){
    return Math.ceil(number/10)*10
}

function calculateSurcharge(tax,new_tax){
    let surcharge;
    if(new_tax){
        if(tax<=10000000){
            surcharge = tax*.1
        }else if(tax<=20000000){
            surcharge = tax*.15
        }else{
            surcharge = tax*.25
        }
    }else{
        if(tax<=10000000){
            surcharge = tax*.1
        }else if(tax<=20000000){
            surcharge = tax*.15
        }else if(tax<=50000000){
            surcharge = tax*.25
        }else{
            surcharge = tax*.37
        }
    }
    return surcharge
}

function checkifEmptyField(dataObj){
    let taxPayer = dataObj.querySelector("#tax_payer").value;
    let newTax = dataObj.querySelector("#new_tax").value;
    let gender = dataObj.querySelector("#gender").value;
    let residentialStatus = dataObj.querySelector("#residential_status").value;

     return(checkifEmpty(taxPayer)||checkifEmpty(newTax)||checkifEmpty(gender)||checkifEmpty(residentialStatus))
}

function checkifEmpty(value){
    return(value==="" || value===undefined)
}
export default utils;