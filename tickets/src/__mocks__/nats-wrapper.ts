// mocking an instance of Nats Client, with Nats client property
export const natsWrapper = {
  // create a mock client with publish method
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
