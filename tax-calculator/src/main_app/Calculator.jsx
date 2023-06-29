import { useContext, useState } from "react";
import constants from "../utils/constants";
import { HouseProperty } from "./HouseProperty";
import { OhterSources } from "./OtherSources";
import { MainContext } from "../context/MainContextProvider";
import utils from "../utils/utils";

export default function Calculator() {
  let { formData, setData, taxCalculation, resetToDefault, showDed, setShowDed } = useContext(MainContext);
  let [showHP, setShowHP] = useState(false);
  let [showOI, setShowOI] = useState(false);
  let [disableBTN, setDisableBTN] = useState(true);

  const submit = e => {
    e.preventDefault();
    taxCalculation();
  }

  const myStyle = {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
  }
  return (
    <>
      <div style={myStyle} className="container">
        <div className="banner">
          <img
            src="https://incometaxindia.gov.in/_Layouts/15/Images/dit/TaxTool/calIcon.png"
            alt="calculator"
            style={{ width: "24px" }}
          />
          <h4>ADVANCE TAX CALCULATOR FOR FINANCIAL YEAR 2023-24</h4>
        </div>

        <div className="calculator-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
          <form onSubmit={submit}>
            <div id="selectorParent">
              <div className="inputDivFlex">
                <label style={{ paddingTop: "15px" }}>Tax Payer</label>
                <select name="tax_payer" id="tax_payer" onInput={(e) => { setData(e.target); setDisableBTN(utils.checkifEmptyField(e.target.parentNode.parentNode)) }}>
                  <option value={constants.BLANK}>Select</option>
                  <option value={constants.INDIVIDUAL}>Individual</option>
                </select>
              </div>

              <div className="inputDivFlex" style={{ marginTop: "10px" }}>
                <label style={{ marginRight: "10px" }}>
                  Whether opting for taxation under Section 115BAC?
                </label>
                <select name="new_tax" id="new_tax" onInput={(e) => { setData(e.target); setShowDed(e.target.value !== "1"); setDisableBTN(utils.checkifEmptyField(e.target.parentNode.parentNode)) }}>
                  <option value={constants.BLANK}>Select</option>
                  <option value={constants.TRUE}>Yes</option>
                  <option value={constants.FALSE}>No</option>
                </select>
              </div>

              <div className="inputDivFlex" style={{ marginTop: "10px" }}>
                <label style={{ marginRight: "10px" }}>
                  Male / Female / Senior Citizen
                </label>
                <select name="gender" id="gender" onInput={(e) => { setData(e.target); setDisableBTN(utils.checkifEmptyField(e.target.parentNode.parentNode)) }}>
                  <option value={constants.BLANK}>Select</option>
                  <option value={constants.MALE}>Male</option>
                  <option value={constants.FEMALE}>Female</option>
                  <option value={constants.SENIOR_CITIZEN}>Senior Citizen</option>
                </select>
              </div>

              <div className="inputDivFlex" style={{ marginTop: "10px" }}>
                <label style={{ marginRight: "10px" }}>Residential Status</label>
                <select name="residential_status" id="residential_status" onInput={(e) => { setData(e.target); setDisableBTN(utils.checkifEmptyField(e.target.parentNode.parentNode)) }}>
                  <option value={constants.BLANK}>Select</option>
                  <option value={constants.RESIDENT}>Resident</option>
                  <option value={constants.NON_RESIDENT}>Non Resident</option>
                  <option value={constants.NOT_ORDINARY_RESIDENT}>
                    Not Ordinary Resident
                  </option>
                </select>
              </div>
            </div>

            <div className="inputDivFlex" style={{ marginTop: "10px" }}>
              <label style={{ marginRight: "10px" }}>
                {
                  "Income from Salary (Income from salary after standard deduction of Rs.50000.)"
                }
              </label>
              <input type="text" name="income_from_salary" onInput={(e) => { setData(e.target) }} />
            </div>

            <div className="inputDivFlex" style={{ marginTop: "10px" }}>
              <label style={{ marginRight: "10px" }}>Income From House Property</label>
              <span style={{ marginRight: "10px" }} className="expandBtn" onClick={() => { setShowHP(!showHP) }}>{showHP === true ? "Hide Details" : "Show Details"}</span>
              <input type="text" name="income_from_house_property" value={formData.income_from_house_property} disabled />
            </div>

            {showHP === true ? (<div style={{ marginTop: "10px" }} ><HouseProperty /></div>) : <></>}

            <div className="inputDivFlex" style={{ marginTop: "10px" }}>
              <label style={{ marginRight: "10px" }}>Income From Other Sources</label>
              <span style={{ marginRight: "10px" }} className="expandBtn" onClick={() => { setShowOI(!showOI) }}>{showOI === true ? "Hide Details" : "Show Details"}</span>
              <input type="text" name="income_from_other_sources" value={formData.income_from_other_sources} disabled />
            </div>

            {showOI === true ? (<div style={{ marginTop: "10px" }}><OhterSources /></div>) : <></>}

            <div className="inputDivFlex" style={{ marginTop: "10px" }}>
              <label style={{ marginRight: "10px" }}>Profits and Gains of Business or Profession (enter profit only)</label>
              <input type="text" name="income_from_business" onInput={(e) => { setData(e.target) }} />
            </div>

            <div className="inputDivFlex" style={{ marginTop: "10px" }}>
              <label style={{ marginRight: "10px" }}>Agricultural Income</label>
              <input type="text" name="agriculture_income" onInput={(e) => { setData(e.target) }} />
            </div>

            {showDed ? <div className="inputDivFlex" style={{ marginTop: "10px" }}>
              <label style={{ marginRight: "10px" }}>Deductions</label>
              <input type="text" name="deductions" />
            </div> : <></>}

            <div className="inputDivFlex" style={{ marginTop: "10px" }}>
              <label style={{ marginRight: "10px" }}>Net Taxable Income</label>
              <input type="text" name="net_taxable_income" value={formData.net_taxable_income} disabled />
            </div>

            <div className="inputDivFlex" style={{ marginTop: "10px" }}>
              <label style={{ marginRight: "10px" }}>Income Tax</label>
              <input type="text" name="income_tax" value={formData.income_tax} disabled />
            </div>

            <div className="inputDivFlex" style={{ marginTop: "10px" }}>
              <label style={{ marginRight: "10px" }}>Surcharge</label>
              <input type="text" name="surcharge" value={formData.surcharge} disabled />
            </div>

            <div className="inputDivFlex" style={{ marginTop: "10px" }}>
              <label style={{ marginRight: "10px" }}>Health and Education Cess</label>
              <input type="text" name="cess" value={formData.cess} disabled />
            </div>

            <div className="inputDivFlex" style={{ marginTop: "10px" }}>
              <label style={{ marginRight: "10px" }}>Total Tax Liability</label>
              <input type="text" name="total_tax" value={formData.total_tax} disabled />
            </div>

            <div style={{ marginTop: "20px",display: "flex", justifyContent: "center" }}>
              <input type="submit" style={{ borderRadius:"12px"}} className="submit" value="Calculate" disabled={disableBTN} />
              <input type="reset" style={{ borderRadius:"12px",padding: "10px 15px", background: "#f33458", border: "0", color: "#fff", cursor: "pointer" }} onClick={resetToDefault} />
            </div>

          </form>
        </div>
      </div>
    </>
  );
}
