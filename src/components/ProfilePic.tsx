import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import React from 'react'

const ProfilePic = () => {
  return (
    <TouchableOpacity className='border-2 border-secondaryDarkGreyHex rounded-xl items-center justify-center bg-secondaryDarkGreyHex overflow-hidden'>
        <Image source={require("../../assets/app_images/avatar.png")} className='h-9 w-9'/>
    </TouchableOpacity>
  )
}

export default ProfilePic

const styles = StyleSheet.create({})