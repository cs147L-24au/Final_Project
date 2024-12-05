import { Text, View, FlatList, StyleSheet, SafeAreaView, Dimensions, Image } from 'react-native';
import * as Font from "expo-font";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export default function JournalComponent({timestamp, entryText}) {
  console.log("Testing if data is being passed", timestamp, entryText);

    return (
        <View style={styles.outerBox}>
            <View style={styles.timeStampOuter}>
                <Text style={styles.timeStampText}>{'📝' + new Date(timestamp).toLocaleDateString()}</Text>
            </View>

            <View style={styles.journalEntryOuter}>
                <Text style={styles.journalText} numberOfLines={1}>{entryText}</Text>
            </View>
       
        </View>
    );
}

const styles = StyleSheet.create({
    outerBox: {
        backgroundColor: '#f9f9f9', // Box background color
        flexDirection: 'column', 
        height: windowHeight * 0.1, 
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd", 
        marginBottom: 5 
    },
    timeStampOuter: {
        backgroundColor: '#f9f9f9', 
        paddingHorizontal: 8, 
        paddingVertical: 4, 
        borderRadius: 4, 
        alignSelf: 'flex-start',
        marginBottom: 8
    },
    timeStampText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'MontserratMedium'
    },
    journalEntryOuter: {
        flexDirection: 2,
        height: windowHeight * 0.5,
        marginLeft: 15,

    },
    journalText: {
        color: '#333',
        fontSize: 14,
        fontWeight: "300",
        fontStyle: "normal",
        fontFamily: "MontserratRegular"
        
    },
  
});