import _ from "lodash";

type TGetInfoData = {
   fileds: string[];
   object: object;
};

/**
 * Extracts specified fields from an object.
 *
 * @param {TGetInfoData} params - An object containing fields and object to extract data from.
 * @returns {object} - A new object containing only the specified fields from the original object.
 */
export const getInfoData = ({ fileds = [], object = {} }: TGetInfoData) => {
   return _.pick(object, fileds);
};
