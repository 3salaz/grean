import lasagna from "../assets/lasagna.JPG";
import ActionButtons from "./ActionButtons";

function LandingView() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const hour = now.getHours(); // hour of the day in 24-hour format

  // Check if current time is within operating hours
  // Operating hours: Tuesday (2) to Friday (5), from 10:00 to 14:00 (2pm)
  const isOpen = dayOfWeek >= 2 && dayOfWeek <= 6 && hour >= 10 && hour < 14;

  return (
    <div className="h-full relative snap-start container">
      <div className="h-[88%] w-full rounded-b-3xl relative">
        <div className="absolute h-full container flex flex-col items-center justify-start">
          <div className="text-banner w-full max-w-[375px] px-2 drop-shadow-2xl flex flex-row justify-around">
            <div className="bg-white container rounded-bl-md px-4 py-2 flex flex-col  justify-center items-start gap-2">
              <div className="flex items-center justify-center gap-2 w-full">
                <div
                  id="days"
                  className="flex flex-col flex-center justify-center items-center"
                >
                  <h3 className="text-sm font-bold">Tuesday - Saturday</h3>
                  <h3 className="text-xs">10am-2pm</h3>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center items-center">
              <div
                className={`text-xl ${
                  isOpen ? "bg-green-600" : "bg-red-600"
                } text-white text-center text-sm font-bold text-bold p-1 rounded-br-lg h-full w-full flex items-center justify-center  px-2`}
              >
                {isOpen ? "We're Open" : "We're Closed"}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center flex-wrap-reverse h-full">
            <div className="font-bold text-5xl text-white pb-40 drop-shadow-2xl">
              <div className="bg-white text-black p-2 py-4">
                <span className="text-mGreen stroke-2">Best</span>{" "}
                Lasagna In The <span className="text-mRed">City</span>
              </div>
            </div>
          </div>
        </div>
        <img
          className="object-cover h-full w-full rounded-b-3xl"
          src={lasagna}
          alt="Lasagna pan"
        ></img>
      </div>

      <ActionButtons />
    </div>
  );
}

export default LandingView;
