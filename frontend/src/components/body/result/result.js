import './result.css'


export default function Result({wpm, acc, resultDisplayStyle}) {
  return (
    <>
    <div className="result-data" style={{display: resultDisplayStyle.displayProp}} >
      <div className="wpm-result" >Word Per Minute: {wpm} WPM</div>
      <div className="acc-result" >Accuracy: {acc}%</div>
    </div>
    </>
  )
}
