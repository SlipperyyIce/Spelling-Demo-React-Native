import { View, Image } from "react-native";
import { beeProfile } from "../../assets";
import { Text } from "../Text";
import { useStores } from "../../stores";
import { observer } from 'mobx-react';

export const ProfileIcon = observer(({ noText = false, imageStyle, style }) => {
  const { dataStore } = useStores();
  const { name } = dataStore;
  const displayName = name || "Welcome!";
  
  return (
    <View style={[{ flexDirection: "row", alignItems: "center", padding: 10 }, style]}>
      {/* Profile Icon */}
      <Image
        source={beeProfile}
        style={[{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginRight: 10,
        }, imageStyle]}
      />

      {/* Text */}
      {!noText && <Text style={{ fontSize: 30 }}>
        {displayName}
      </Text>}
    </View>
  );
});
