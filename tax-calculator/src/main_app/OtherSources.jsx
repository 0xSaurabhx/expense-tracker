import { useContext } from "react"
import { MainContext } from "../context/MainContextProvider"

export function OhterSources() {
    let { setData, calculateOtherIncome } = useContext(MainContext);

    return <div className="otherSourcesOptions">
        <div className="inputDivFlex" style={{ marginTop: "10px" }}>
            <label style={{ marginRight: "10px" }}>Interest</label>
            <input type="text" name="savings_interest" onInput={(e) => { setData(e.target) }} onBlur={calculateOtherIncome} />
        </div>

        <div className="inputDivFlex" style={{ marginTop: "10px" }}>
            <label style={{ marginRight: "10px" }}>Commission/Other Income</label>
            <input type="text" name="commission" onInput={(e) => { setData(e.target) }} onBlur={calculateOtherIncome} />
        </div>

        <div className="inputDivFlex" style={{ marginTop: "10px" }}>
            <label style={{ marginRight: "10px" }}>Winnings from Lottery, Crossword Puzzles, etc.</label>
            <input type="text" name="lottery" onInput={(e) => { setData(e.target) }} onBlur={calculateOtherIncome} />
        </div>
    </div>
}