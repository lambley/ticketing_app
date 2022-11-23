// mocking an instance of Nats Client, with Nats client property
export const natsWrapper = {
  // create a mock client with publish method
  client: {
    publish: (subject: string, data: string, callback: () => void) => {
      // invoke callback straight away to close the promise
      callback();
    },
  },
};
