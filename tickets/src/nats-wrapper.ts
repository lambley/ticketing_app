import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  // _client is not initialised here, but in the start() function in index.ts
  private _client?: Stan;

  // accessor to control access to client only after successful connection
  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      // on connect, log connection
      this._client!.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this._client!.on('error', (err) => {
        reject(err);
      });
    });
  }
}

// export an instance to be used by the whole service, rather than the class
export const natsWrapper = new NatsWrapper();
