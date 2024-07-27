import { useEffect, useState } from "react";
import { Form, useBlocker } from "react-router-dom";

export function Page1() {
  const [value, setValue] = useState("");

  const [timeSpent, setTimeSpent] = useState<number>(0);

  // Block navigating elsewhere when data has been entered into the input
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      value !== "" && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    const reloadHandler = (event: BeforeUnloadEvent) => {
      // we can add logic to stop the timer and restart and even make an api call
      event.preventDefault();
      confirm("Are you sure?");
    };

    window.addEventListener("beforeunload", reloadHandler);

    return () => {
      window.removeEventListener("beforeunload", reloadHandler);
    };
  }, []);

  useEffect(() => {
    const timerRef = setInterval(() => {
      if (blocker.state !== "blocked") {
        setTimeSpent((prev) => prev + 1);
      }
    }, 1000);

    return () => {
      clearInterval(timerRef);
    };
  }, [blocker]);

  console.log(timeSpent);

  return (
    <Form method="post">
      <label>
        Enter some important data:
        <input
          name="data"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>

      {blocker.state === "blocked" ? (
        <div>
          <p>Are you sure you want to leave?</p>
          <button onClick={() => blocker.proceed()}>Proceed</button>
          <button onClick={() => blocker.reset()}>Cancel</button>
        </div>
      ) : null}
    </Form>
  );
}
