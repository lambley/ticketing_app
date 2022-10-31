import mongoose from 'mongoose';

// Ticket model interface - for Ticket attributes
// interface for Ticket model - all instances must have these fields
interface TicketAttrs {
  title: string;
  price: number;
  TicketId: string;
}

// Ticket model interface - for Ticket properties
// extending mongoose.Model and including build method - for TS interface
// interface describing functions for Ticket Collection
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

// Ticket Document interface
// interface for describing a single Ticket's properties
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

// mongoDB Ticket schema
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    // transform Ticket Document JSON response - specific to Mongoose
    toJSON: {
      transform(_doc, ret, _options) {
        // rename _id property
        ret.id = ret._id;
        delete ret._id;
        // remove versionKey property from Ticket JSON
        delete ret.__v;
      },
    },
  }
);

// refactor buildTicket as statics
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

// compile Ticket model and export
// add interfaces for TicketDoc and TicketModel
// TicketDoc adds attributes for the model
// TicketModel adds return type for the model
// see mongoose.model definition for more info
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

// build a new Ticket like this
// const ticket = Ticket.build({
//   title: 'test ticket',
//   price: 20.00,
//   userId: "some_id"
// });

export { Ticket };
