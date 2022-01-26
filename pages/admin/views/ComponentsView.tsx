import axios from "axios";
import React from "react";
import Button from "../components/Button";

const ComponentsView = () => {
  return (
    <div className="p-8 flex flex-col gap-8">
      <div>
        <h1 className="mb-6 text-lg font-semibold">Botones</h1>
        <div className="flex gap-2">
          <Button>Hola</Button>
          <Button style="secondary">Hola</Button>
          <Button style="tertiary">Hola</Button>
        </div>
      </div>
      <div>
        <h1 className="mb-6 text-lg font-semibold">Botones</h1>
      </div>
    </div>
  );
};

export default ComponentsView;
