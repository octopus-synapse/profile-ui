

import { View, Text, StyleSheet } from "react-native";
import {
 useForm,
 useFormField,
 type FormProps,
 type FormFieldProps,
 type FormLabelProps,
 type FormDescriptionProps,
 type FormErrorProps,
 type FormActionsProps,
 formTokens,
} from "../../shared/form";



export function Form({ children, onSubmit, testID }: FormProps) {
 useForm({ onSubmit, children });
 return <View testID={testID}>{children}</View>;
}



export function FormField({ name, error, children }: FormFieldProps) {
 const { hasError, errorMessage } = useFormField({ name, error });

 return (
  <View style={styles.field}>
   {children}
   {hasError && errorMessage && (
    <Text style={styles.error}>{errorMessage}</Text>
   )}
  </View>
 );
}



export function FormLabel({ children, required = false }: FormLabelProps) {
 return (
  <Text style={styles.label}>
   {children}
   {required && <Text style={{ color: formTokens.label.required }}> *</Text>}
  </Text>
 );
}



export function FormDescription({ children }: FormDescriptionProps) {
 return <Text style={styles.description}>{children}</Text>;
}



export function FormError({ children }: FormErrorProps) {
 return <Text style={styles.error}>{children}</Text>;
}



export function FormActions({ children, align = "right" }: FormActionsProps) {
 const justifyMap = {
  left: "flex-start" as const,
  center: "center" as const,
  right: "flex-end" as const,
  between: "space-between" as const,
 };

 return (
  <View style={[styles.actions, { justifyContent: justifyMap[align] }]}>
   {children}
  </View>
 );
}

const styles = StyleSheet.create({
 field: {
  marginBottom: formTokens.field.marginBottom,
  gap: formTokens.field.gap,
 },
 label: {
  fontSize: formTokens.label.fontSize,
  color: formTokens.label.color,
 },
 description: {
  fontSize: formTokens.description.fontSize,
  color: formTokens.description.color,
 },
 error: {
  fontSize: formTokens.error.fontSize,
  color: formTokens.error.color,
 },
 actions: {
  flexDirection: "row",
  gap: formTokens.actions.gap,
  paddingTop: formTokens.actions.paddingTop,
 },
});
