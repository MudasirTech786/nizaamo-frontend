<AssetDrawer
    open={drawerOpen}
    assetId={selectedAssetId}
    onClose={() => {
        setDrawerOpen(false);
        setSelectedAssetId(null);
    }}
/>