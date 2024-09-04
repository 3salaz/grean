import React from "react";
import lasagna from "../assets/lasagna.JPG";
import {
  IonCol,
  IonIcon,
  IonImg,
  IonGrid,
  IonRow,
} from "@ionic/react";

function Home() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hour = now.getHours();
  const isOpen = dayOfWeek >= 2 && dayOfWeek <= 6 && hour >= 10 && hour < 14;

  return (
    <IonGrid
    color="primary"
      id="welcome"
      className='flex-grow relative'
    >
      <IonImg
        className="object-cover w-full rounded-b-3xl"
        src={lasagna}
        alt="Lasagna pan"
      />

      <div className="">
        <IonRow className=" w-full flex flex-col gap-2 items-center justify-center">
          <IonCol
            size="12"
            className="text-banner w-full max-w-[375px] drop-shadow-2xl flex flex-row justify-around"
          >
            <div className="bg-white container rounded-bl-md px-4 py-2 flex flex-col justify-center items-start gap-2">
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
                  isOpen ? "bg-mGreen" : "bg-red-600"
                } text-white text-center text-sm font-bold p-1 rounded-br-lg w-full flex items-center justify-center px-2`}
              >
                {isOpen ? "We're Open" : "We're Closed"}
              </div>
            </div>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol
            size="12"
            className="flex items-center justify-center gap-2 col-span-3 row-span-2 p-1"
          >
            <a
              href="https://www.facebook.com/marcellaslasagneria/"
              target="_blank"
              rel="noreferrer"
              className="bg-[#4267B2] text-white drop-shadow-xl rounded-md h-[90%] aspect-square flex items-center justify-center"
            >
              <ion-icon size="large" name="logo-facebook"></ion-icon>
            </a>

            <a
              href="https://www.youtube.com/channel/UCvSzZgB-27Llh-IllTqGL7Q"
              target="_blank"
              rel="noreferrer"
              className="bg-[#FF0000] text-white drop-shadow-xl rounded-md h-[90%] aspect-square flex items-center justify-center p-1"
            >
              <ion-icon size="large" name="logo-youtube"></ion-icon>
              <IonIcon icon="instagram"></IonIcon>
            </a>

            <a
              href="https://www.instagram.com/marcellaslasagneriasf/?hl=en"
              target="_blank"
              rel="noreferrer"
              className="instagram-logo text-white drop-shadow-xl rounded-md h-[90%] aspect-square flex items-center justify-center "
            >
              <ion-icon size="large" name="logo-instagram"></ion-icon>
            </a>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="w-full flex justify-center items-start flex-wrap">
            <div className="font-bold text-3xl drop-shadow-2xl px-2">
              <div className="bg-white rounded-t-md text-black p-2 py-4 flex items-center justify-center flex-wrap gap-2">
                <span className="text-mGreen stroke-2">Best</span>Lasagna In The
                <span className="text-mRed">City</span>
              </div>
              <div className="text-lg rounded-b-md text-center bg-mGreen text-white">
                Call Us! 14159202225
              </div>
            </div>
          </IonCol>
        </IonRow>
      </div>
    </IonGrid>
  );
}

export default Home;