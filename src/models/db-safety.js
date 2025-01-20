/**
 *
 * @param {import("sequelize").ModelCtor<Model<any, any>>} model
 */
export const dataCleanser = async (model, data) => {
  const cleanedData = {};

  for (const key in data) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) continue;

    const value = data[key];
    if (typeof value === "string") {
      cleanedData[key] = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    } else {
      cleanedData[key] = value;
    }
  }

  return await model.create(cleanedData);
};
