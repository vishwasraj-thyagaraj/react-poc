/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton, Table } from "antd";
import { useEffect, useState } from "react";

const columns = [
  {
    dataIndex: "name",
    key: "name",
    title: "Name",
  },
  {
    dataIndex: "asset_type",
    key: "asset_type",
    title: "Asset Type",
    render: (text) => {
      return text || "--";
    },
  },
  {
    dataIndex: "asset_tag",
    key: "asset_tag",
    title: "Asset Tag",
    render: (text) => {
      return text || "--";
    },
  },
  {
    dataIndex: "usage_type",
    key: "usage_type",
    title: "Usage Type",
    render: (text) => {
      return text || "--";
    },
  },
  {
    dataIndex: "location",
    key: "location",
    title: "Location",
    render: (text) => {
      return text || "--";
    },
  },
];

export const AssetsTable = () => {
  const [assetsData, setAssetsData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [assetTypesData, setAssetTypesData] = useState(null);
  const options = {
	method: 'GET',
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
		'Accept': 'application/json',
		'X-CSRF-Token': window?.REACT_USER_ATTRIBUTES?.meta?.csrf_token,
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': 'true'
	}
  };

  let hostname;
  if(window.location.hostname.includes('freshservice-dev')) {
    hostname = `${window.location.protocol}//${window.location.hostname}:4000/api/_`;
  } else {
    hostname = `${window.location.protocol}//${window.location.hostname}/api/_`;
  }

  useEffect(() => {
    fetch(hostname + "/assets", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setAssetsData(
          data.assets.map((asset) => ({ key: asset.id, ...asset }))
        );
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(hostname + "/locations", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setLocationData(data.locations);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(hostname + "/asset_types", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setAssetTypesData(data.asset_types);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  if (!assetsData || !locationData || !assetTypesData) {
    return (
      <div className="shimmer-wrapper">
        <Skeleton
          active
          paragraph={{ rows: 15 }}
          className="p-8"
          style={{
            width: "70%",
            borderRight: "1px solid var(--color-boundary-border-mildest)",
            height: "calc(100vh - 65px)",
          }}
        />
        <Skeleton
          paragraph={{
            rows: 10,
            width: [100, 200, 100, 200, 100, 200, 100, 200, 100, 200],
            style: { height: "24px" },
          }}
          className="p-8"
          style={{ width: "30%", height: "calc(100vh - 65px)" }}
        />
      </div>
    );
  }

  let data = [];

  console.log(assetsData, locationData, assetTypesData);

  data = assetsData.map((asset) => {
    return {
      ...asset,
      location: locationData.find(
        (location) => location.id === asset.location_id
      )?.name,
      asset_type: assetTypesData.find(
        (assetType) => assetType.id === asset.asset_type_id
      )?.name,
    };
  });

  return <Table columns={columns} dataSource={data} />;
};

export default AssetsTable;
