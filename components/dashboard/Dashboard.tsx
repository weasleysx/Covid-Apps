import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const AnimatedForm = ({ children }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  return <animated.div style={props}>{children}</animated.div>;
};

const Dashboard = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", maxlength: 500 });

  return (
    <>
      <div className="text-5xl font-bold text-[#ffc107] text-start pt-6 pb-2 px-6">
        COVID Timeline Generator
      </div>
      <div className=" grid grid-cols-3 grid-rows-2 m-10">
      <AnimatedForm>
        <div className=" col-span-1">
          <form className="vue-form bg-[#234973] m-2 p-5 flex flex-col">
            <fieldset>
              <legend className="pt-3">ข้อมูลผู้ป่วย</legend>
              <div className="pt-2 flex">
                    {/* Gender */}
                    <div className="flex-1 pr-2">
                      <label className="label pb-2" htmlFor="gender">
                        เพศ
                      </label>
                      <input
                        type="text"
                        name="gender"
                        id="gender"
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full border p-1"
                      />
                    </div>
                    {/* Age */}
                    <div className="flex-1 pl-2">
                      <label className="label pb-2" htmlFor="age">
                        อายุ
                      </label>
                      <input
                        type="text"
                        name="age"
                        id="age"
                        required
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full border p-1"
                      />
                    </div>
                  </div>
                  <div className="pt-2">
                    <label className="label pb-2" htmlFor="email">
                      อาชีพ
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="w-full border p-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
            </fieldset>
          </form>
        </div>
        </AnimatedForm>
        <div className=" col-span-2 row-span-2 ml-2">
        <AnimatedForm>
        <form className="vue-form border-2 border-[#ffc107] m-2 p-5 flex flex-col">
              <fieldset>
              <div className="text-3xl font-bold text-[#ffc107] text-center pt-2 pb-2 px-6">Timeline </div>
                <div className="pt-2">
                  <div className="bg-[#ffc107] rounded-full	w-1/3  mx-auto	p-10"></div>

                  {/* ... (rest of the form fields) */}
                </div>
              </fieldset>
              </form>
              </AnimatedForm>
        </div>
        <AnimatedForm>
        <div className=" col-span-1">
        <form className="vue-form bg-[#234973] m-2 p-5 flex flex-col">
                <fieldset>
                  <legend className="pt-3">ข้อมูลไทม์ไลน์</legend>
                  <div className="pt-2">
                    <label className="label pb-2" htmlFor="datetime">
                      วันเวลา
                    </label>
                    <input
                      type="text"
                      name="datetime"
                      id="datetime"
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="border p-2"
                    />
                  </div>
                  <div>
                    <label className="label py-2" htmlFor="textarea">
                      รายละเอียด
                    </label>
                    <textarea
                      className="message"
                      name="textarea"
                      id="textarea"
                      required
                      value={message.text}
                      maxLength={message.maxlength}
                      onChange={(e) =>
                        setMessage({
                          text: e.target.value,
                          maxlength: message.maxlength,
                        })
                      }
                    />
                    <span className="counter text-white">
                      {message.text.length} / {message.maxlength}
                    </span>
                  </div>
                </fieldset>
              </form>
        </div>
        </AnimatedForm>
      </div>
    </>
  );
};

export default Dashboard;
