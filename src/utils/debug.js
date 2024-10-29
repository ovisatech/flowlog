const debug = (message, data) => {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(message, data ?? "");
  }
};

export default debug;
