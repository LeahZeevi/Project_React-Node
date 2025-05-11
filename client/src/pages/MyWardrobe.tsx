import { useState } from "react"
import GeneralCategory from "./GeneralCategory"
import { Link } from "react-router"

const MyWardrobe = () => {
  const [typeCategory, setTypeCategory] = useState<string>("")
  const handleChooseType = (typeItem: string) => {
    // alert(typeItem)
    setTypeCategory(typeItem)
  }

  return (
    <div>
      <h1>myWardrobe</h1>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", textAlign: "center" }}>
        <Link to="חולצות"  > <div style={{ height: "40vh", width: "49vw", backgroundColor: "pink" }} onClick={() => handleChooseType("חולצות")}>חולצות</div></Link>
        <Link to="חצאיות"> <div style={{ height: "40vh", width: "49vw", backgroundColor: "green" }} onClick={() => handleChooseType("חצאיות")}>חצאיות</div></Link>
        <Link to="שמלות"> <div style={{ height: "40vh", width: "30vw", backgroundColor: "violet" }} onClick={() => handleChooseType("שמלות")}>שמלות</div></Link>
        <Link to="פיז'מות"><div style={{ height: "40vh", width: "30vw", backgroundColor: "red" }} onClick={() => handleChooseType("פיז'מות")}>פיז'מות</div></Link>
        <Link to="נעלים"> <div style={{ height: "40vh", width: "30vw", backgroundColor: "blue" }} onClick={() => handleChooseType("נעלים")}>נעלים</div></Link>
      </div>
      {/* {typeCategory!=""&&<GeneralCategory typeCategory={typeCategory}/>} */}
    </div>
  )
}

export default MyWardrobe
