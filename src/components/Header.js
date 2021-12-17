import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Header({ size, ...props}) {
  return <Text style={styles.header(size)} {...props} />
}

const styles = StyleSheet.create({
  header: (size) => ({
    fontSize: size || 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
    textAlign: 'center'
  }),
})
