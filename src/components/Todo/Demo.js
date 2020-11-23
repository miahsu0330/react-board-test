import React, {
  useState,
  useRef,
  useEffect,
  memo,
  useMemo,
  useContext,
  createContext,
} from "react";

// prop drilling 問題
// Context 脈絡

const TitleContext = createContext();
const ColorContext = createContext();

function DemoInnerBoxContent() {
  const [title, setTitle] = useContext(TitleContext);
  const colors = useContext(ColorContext);
  return (
    <button
      style={{
        color: colors.primary,
      }}
      onClick={() => {
        setTitle(Math.random());
      }}
    >
      {title}
      Update title
    </button>
  );
}

function DemoInnerBox() {
  return (
    <ColorContext.Provider
      value={{
        primary: "#00ff00",
      }}
    >
      <DemoInnerBoxContent />
    </ColorContext.Provider>
  );
}

function DemoInner() {
  return <DemoInnerBox />;
}

export default function Demo() {
  const [title, setTitle] = useState("I am title");

  // 深色模式做法
  const [colors, setColors] = useState({
    primary: "#ff0000",
  });
  return (
    //提供值的這個人
    <ColorContext.Provider value={colors}>
      <TitleContext.Provider value={[title, setTitle]}>
        <div>
          <button
            onClick={() => {
              setColors({
                primary: "#0000ff",
              });
            }}
          >
            click me
          </button>
          <DemoInner setTitle={setTitle} />
          title: {title}
        </div>
      </TitleContext.Provider>
    </ColorContext.Provider>
  );
}
