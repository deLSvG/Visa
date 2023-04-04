import React, { useState } from "react";
import { ReactComponent as PassportIcon } from "./background_img/done.svg";
import { ReactComponent as RejectIcon } from "./background_img/reject.svg";
import { ReactComponent as ResolveIcon } from "./background_img/resolve.svg";

const Visa = () => {
  const doc = [
    { status: "start" },
    { status: "checking your passport", icon: null },
    { status: "passport is checked", icon: <PassportIcon className="svgIcon" /> },
    { status: "checking your scans and copies", icon: null },
    { status: "your scan ok", icon: <PassportIcon className="svgIcon" /> },
    { status: "passport checked", icon: <PassportIcon className="svgIcon" /> },
    { status: "all scans is ok", icon: <PassportIcon className="svgIcon" /> },
    { status: "ua passport also ok", icon: <PassportIcon className="svgIcon" /> },
    { status: "marriage - you meried", icon: <PassportIcon className="svgIcon" /> },
    { status: "you don't have any children", icon: <PassportIcon className="svgIcon" /> },
    { status: "you're  poor", icon: <PassportIcon className="svgIcon" /> },
    // { status: "you're  poor", icon: <RejectIcon className="svgIcon" /> },
  ];

  const [output, setOutput] = useState([]);
  const [count, setCount] = useState(0);

  const validation = () => {
    setOutput([]);
    setCount(0);

    const validateStep = (index) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (index >= doc.length) {
            setOutput((prevOutput) => [
              ...prevOutput,
              { count: prevOutput.length + 1, status: "finish", icon: <ResolveIcon className="svgIcon" /> },
            ]);
            resolve();
          } else {
            const currentStep = doc[index];
            setOutput((prevOutput) => [
              ...prevOutput,
              { count: prevOutput.length + 1, status: currentStep.status, icon: currentStep.icon },
            ]);

            if (currentStep.icon === <RejectIcon className="svgIcon" />) {
              console.log(`Step ${index} was rejected.`);
              reject();
            } else {
              validateStep(index + 1)
                .then(resolve)
                .catch(reject);
            }
          }
        }, 2000);
      });
    };

    validateStep(0)
      .then(() => console.log("Validation complete."))
      .catch(() => console.log("Validation failed."));
  };

  return (
    <div className="container">
      <button className="validation" onClick={validation}>
        To Audit
      </button>

      <ul className="ulHTML">
        {output.map((item) => (
          <li className="liItem" key={item.count}>
            <p className="pItem">{item.status}</p>
            {item.icon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Visa;
