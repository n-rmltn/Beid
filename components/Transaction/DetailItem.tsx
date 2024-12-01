import { Text, View } from "react-native";

export const DetailItem: React.FC<{
  label: string;
  value: string | number;
}> = ({ label, value }) => (
  <View className="flex-row justify-between py-2 border-b border-muted">
    <Text className="text-base text-muted-foreground">{label}:</Text>
    <Text className="text-base font-medium text-foreground">
      {typeof value === "string" ? toTitleCase(value) : `RM${value.toFixed(2)}`}
    </Text>
  </View>
);

export const toTitleCase = (str: string): string => {
  if (str !== str.toUpperCase()) return str;

  return str
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
