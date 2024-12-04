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
        backgroundColor: '#fff', // Box background color
        flexDirection: 'column', 
        height: windowHeight * 0.1      
    },
    timeStampOuter: {
        backgroundColor: '#FFFF', 
        paddingHorizontal: 8, 
        paddingVertical: 4, 
        borderRadius: 4, 
        alignSelf: 'flex-start',
        marginBottom: 8
    },
    timeStampText: {
        color: '#765ef4',
        fontSize: 14,
        fontWeight: '500'
    },
    journalEntryOuter: {
        flexDirection: 2,
        height: windowHeight * 0.5,
        marginLeft: 15
    },
    journalText: {
        color: '#765ef4',
        fontSize: 14,
        fontWeight: '500'
    },
  
});