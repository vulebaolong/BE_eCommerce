import _ from "lodash";

type TGetInfoData = {
    fileds: string[];
  object: object;
};
export const getInfoData = ({ fileds = [], object = {} }: TGetInfoData) => {
  return _.pick(object, fileds);
};
