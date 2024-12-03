import { Text, View, FlatList, StyleSheet, SafeAreaView, Dimensions, Image } from 'react-native';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export default function JournalComponent({timestamp, entryText}) {
  console.log("Testing if data is being passed", timestamp, entryText);

    return (
        <View style={styles.outerBox}>
            <View style={styles.timeStampOuter}>
                <Text style={styles.timeStampText}>{timestamp}</Text>
            </View>

            <View style={styles.journalEntryOuter}>
                <Text style={styles.journalText} numberOfLines={1}>{entryText}</Text>

            </View>
       
        </View>
    );
}

const styles = StyleSheet.create({
    outerBox: {
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        paddingHorizontal: 14,
        alignItems: 'center',
        height: windowHeight * 0.08, 
    },
    timeStampOuter: {
        flexDirection: 'row',
        height: windowHeight * 0.5,

    },
    timeStampText: {
        color: '#765ef4',
        fontSize: 16,
        fontWeight: '500'
    },
    journalEntryOuter: {
        flexDirection: 'row',
        height: windowHeight * 0.5,
    },
    journalText: {
        color: '#765ef4',
        fontSize: 16,
        fontWeight: '500'
    },
  
});