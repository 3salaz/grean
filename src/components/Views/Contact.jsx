import ContactForm from "../ContactForm";
import ViewsHeader from "./ViewsHeader";

function Contact() {
  return (
    <div className="h-full snap-center">
      <div className="h-full w-full overscroll-none">
        <ViewsHeader viewName={"Contact"} />
        <section className="w-full h-[90%] flex items-center justify-center bg-mYellow px-2">
          <div className="container mx-auto flex items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center gap-3 h-full w-full">
              <div className="w-full">
                <div className="relative flex flex-col gap-4 container mx-auto  rounded-lg bg-white shadow-lg sm:p-12">

                  <div className="w-full p-6  text-center flex flex-col items-center md:block bg-mGreen text-white rounded-lg">
                    <div className="max-w-full">
                    <div className="w-full text-center p-2">
                    <div className="text-2xl font-bold ">
                      Send Us A Message!
                    </div>
                  </div>
                      <p className="leading-relaxed text-md">
                        Bringing a large group? Looking to collab on our social
                        media? Maybe you just want to send some love to the
                        crew! Whatever it is, just send us a message and we'll
                        get back to you as soon as we can.
                      </p>
                    </div>
                  </div>

                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
