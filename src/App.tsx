import React, { useState } from "react";
import "./App.css";
import { useMapper } from "./lib/components/useMapper";

type Gender = "Male" | "Female" | "Other";

interface IPerson {
  id: number;
  name: string;
  surname: string;
  fullName: (name: string, surname: string) => string;
  gender: Gender;
}

const fullName = (name: string, surname: string) => {
  return name + " " + surname;
};

const items: Array<IPerson> = [
  { id: 1, fullName, gender: "Male", name: "James", surname: "Watson" },
  { id: 2, fullName, gender: "Male", name: "Ted", surname: "Wilson" },
  { id: 3, fullName, gender: "Female", name: "Anthea", surname: "Apricot" },
  { id: 4, fullName, gender: "Female", name: "Lolita", surname: "Perez" },
];

function App() {
  const Mapper = useMapper<IPerson>({
    items: items,
    returnType: <li />,
  });

  const [selectedValue, setSelectedValue] = useState<string>("0");

  return (
    <div className="App">
      Selected Value: {selectedValue}
      <ul className="item-list">
        <Mapper
          value="id"
          label={["id", "name", "surname", "gender"]}
          className="item"
          selectedValue={selectedValue}
          selectedItemChanged={(value) => setSelectedValue(value)}
          selectedValueClass="selected-value"
        ></Mapper>
      </ul>
    </div>
  );
}

export default App;
