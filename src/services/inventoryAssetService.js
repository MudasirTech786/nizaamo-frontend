import api from "@/lib/api";

export const getAssets = async (params = {}) => {
  const response = await api.get(
    "/inventory/inventory-assets",
    {
      params,
    }
  );

  return response.data;
};

export const getAsset = async (id) => {
  const response = await api.get(
    `/inventory/inventory-assets/${id}`
  );

  return response.data;
};

export const lookupAsset = async (uuid) => {
  const response = await api.get(
    `/inventory/inventory-assets/lookup/${uuid}`
  );

  return response.data;
};

export const updateAssetStatus = async (
  assetId,
  status,
  notes = ""
) => {
  const response = await api.post(
    `/inventory/inventory-assets/${assetId}/status`,
    {
      status,
      notes,
    }
  );

  return response.data;
};