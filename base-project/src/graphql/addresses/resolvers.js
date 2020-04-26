const AddressRepository = require("@repositories/AddressRepository");
const { removeAddressError } = require("@utils/messages");
const { serverError, notFound } = require("@utils/http");

const addressQueries = {
  async getUserAddresses(root, { user_id }) {
    try {
      const addresses = await AddressRepository.getAddresses(user_id);
      return addresses;
    } catch (error) {
      return serverError(error);
    }
  },
};

const addressMutations = {
  async createAddress(root, { user_id, address }) {
    try {
      const addressCreated = await AddressRepository.save({ user_id, ...address })
      return addressCreated;
    } catch (error) {
      return serverError(error);
    }
  },
  async deleteAddress(root, { user_id, address_id }) {
    try {
      const isAddressRemoved = await AddressRepository.delete({ user_id, address_id })

      if (!isAddressRemoved) {
        return notFound(removeAddressError);
      }

      return true;
    } catch (error) {
      return serverError(error);
    }
  },
};

module.exports = {
  addressQueries,
  addressMutations,
};
