module.exports = {
    find: async (schema, filter = {}) => {
        const data = await schema.find(filter);
        return data;
    },

    findOne: async (schema, filter = {}) => {
        const data = await schema.findOne(filter);
        return data;
    },

    findAll: async (schema) => {
        const data = await schema.find({});
        return data;
    },

    findOneAndUpdate: async (schema, filter, update) => {
        const data = await schema.findOneAndUpdate(filter, update);
        return data;
    },

    findOneAndDelete: async (schema, filter) => {
        const data = await schema.findOneAndDelete(filter);
        return data;
    },

    create: async (schema, data) => {
        const dataInsert = await schema.create(data);
        return dataInsert;
    }
}
