import ActionBtnGrid from "./ActionBtnGrid";
import BallBounce from "./BallBounce";

function ActionButtons() {
 
  return (
    <div className="absolute bottom-5 w-full rounded-lg px-4 flex flex-col gap-4">
      {/* Action Button Grid */}
      <ActionBtnGrid />
      <BallBounce/>
    </div>
  );
}

export default ActionButtons;