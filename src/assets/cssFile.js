// styles.js
import { StyleSheet } from 'react-native';

// Color Constants
const colors = {
    background: '#f3f3f3',
    logoColor: '#007ACC',
    buttonColor: '#ff9900',
    linkColor: '#007185',
    white: '#FFFFFF',
    lightGray: '#EAEAEA',
    darkGray: '#333',
    bgBlue: '#00CED1',
    purple: '#7F00FF',
};

const styles = StyleSheet.create({
    // General styles
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        background: colors.white,
    },
    logo: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        width: '100%',
    },
    input: {
        height: 50,
        paddingHorizontal: 10,
        flex: 1,
    },
    input1: {
        height: 100,
        paddingHorizontal: 10,
        flex: 1,
        fontSize: 25,
    },
    button: {
        backgroundColor: colors.buttonColor,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    link: {
        color: colors.linkColor,
        textAlign: 'center',
        marginBottom: 10,
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signInText: {
        marginRight: 5,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signUpText: {
        marginRight: 5,
    },
    inputIcon: {
        marginLeft: 10,
    },

    // Home styles

    heroContainer: {
        flex: 1,
        backgroundColor: colors.background,
        // paddingTop: 20,
        backgroundColor: colors.white,
    },
    heroLogo: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.white, // White background
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderRadius: 10,
    },
    headerLogo: {
        fontSize: 28, // Slightly larger logo
        fontWeight: 'bold',
        color: colors.logoColor, // Amazon-like blue color
    },
    heroTopView: { backgroundColor: colors.bgBlue, padding: 10, flexDirection: 'row', alignItems: "center" },
    // heroTopSearch: { backgroundColor: colors.white, paddingY: 10, flexDirection: 'row', alignItems: "center", border:black },
    // heroPressable: {
    //     flexDirection: "row", alignItems: "center", marginHorizontal: 7, gap: 10, backgroundColor: colors.white, borderRadius: 3, height: 30, flex: 1,
    // },


    heroTopShop: {
        marginTop: 50,
        fontSize: 30,
        fontWeight: 'bold', // Adjusted to 'bold' for proper weight
        textAlign: 'left', // Align text to the left
        marginHorizontal: 10,
    },
    heroTopSearch: {
        backgroundColor: '#fff', // White background
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        marginHorizontal: 10,
    },
    dropdownContainer: {
        width: 100,
        marginLeft: 173,
    },
    DropdownStyle: {
        paddingLeft: 10,
        paddingRight: 10,
        height: 50,
        borderColor: '#EAECEE',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        width: 200,
    },
    selectedText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black', // You can change the color
    },

    heroPressable: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        gap: 10,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 8,
        fontSize: 16,
        color: '#333', // Text color
    },

    heroFilter: {
        marginTop: 20,
        marginBottom: 20,
        // marginRight: 10,
        flexDirection: 'row',
        // justifyContent: 'flex-end', // Align items to the right
        justifyContent: 'space-between', // Align items to the right
        alignItems: 'center', // Center vertically
        // paddingHorizontal: 3,
        marginLeft: 3,
        gap: 10,
    },


    filterButton: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    sortButton: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    filterText: {
        fontSize: 18,
        color: '#000', // Adjust color for filters
        fontWeight: 'bold',
    },
    sortText: {
        fontSize: 18,
        color: '#000', // Adjust color for sort options
        fontWeight: 'bold',
    },
    sortByText: {

        fontSize: 18,
        color: '#000', // Adjust color for sort options
        fontWeight: 'medium',
    },



    heroSearchIcon: { paddingLeft: 10 },
    heroTopNavBar: { backgroundColor: colors.white },
    icon: {
        padding: 10,
    },
    categoryList: {
        paddingVertical: 10,
    },
    category: {
        alignItems: 'center',
        marginHorizontal: 5, // Decreased margin for better alignment
        backgroundColor: colors.white, // White background for categories
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        padding: 10, // Added padding for better touch area
        height: 120, // Set fixed height for the category box
        width: 100, // Set a fixed width for category items
    },
    categoryImage: {
        width: 80, // Adjust image size
        height: 80, // Adjust image size
        borderRadius: 10,
        marginBottom: 5,
    },
    categoryTitle: {
        marginTop: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.darkGray,
        fontSize: 10, // Slightly smaller font size for better fit
    },
    featuredSection: {
        marginTop: 20,
        padding: 10,
        backgroundColor: colors.white, // White background for featured section
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    featuredTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.logoColor, // Consistent color with the logo
    },

    heroTreanding: {
        flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", paddingHorizontal: 10, backgroundColor: colors.background,
    },

    ResendButtonText: {
        color: colors.logoColor,
        alignItems: 'center',
    },

    heroTopImage: {
        width: '90%',
        height: 175,
        // resizeMode: "contain",
        marginLeft: 8,
        marginTop: 8,

        borderWidth: 5,
        // borderColor: "#fff",
        borderRadius: 12,
        padding: 10,

    },

    heroProductView: {
        backgroundColor: '#fff',
        // height:280,
    },
    // Add Addresses Screen StyleSheet
    heroProductBottom: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginBottom: 10, marginTop: 10,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    heroProductTitle: {
        marginLeft: 14,
        marginTop: 8,
    },

    heroProductColor: {
        height: 12,
        width: 12,
        borderRadius: 7, // This will create a circle
    },

    paginationControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    pageNumber: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        // backgroundColor: '#f0f0f0', // Light background for page numbers
    },
    activePage: {
        backgroundColor: '#333', // Dark background for active page
    },
    activePageText: {
        color: "#fff", // Set text color for active page number
    },
    pageText: {
        fontSize: 16,
        color: '#333', // Text color for page numbers
    },
    paginationArrow: {
        fontSize: 20,
        marginHorizontal: 10,
        color: '#333', // Color for arrows
    },

    heading: {
        fontSize: 20,
        fontWeight: "bold",
    },
    form: {
        marginVertical: 20,
    },
    AddAddressinput: {
        // borderWidth: 1,
        borderColor: "#D0D0D0",
        borderColor: "#D0D0D0",
        // borderRadius: 5,
        // padding: 10,
        // marginBottom: 10,
        marginTop:20,
    },
    addButton: {
        marginVertical:30,
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    addButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    addressCard: {
        borderWidth: 1,
        borderColor: "#D0D0D0",
        padding: 10,
        marginVertical: 10,
    },
    addressHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    addressName: {
        fontSize: 15,
        fontWeight: "bold",
    },
    actionButtons: {
        flexDirection: "row",
        gap: 10,
        marginTop: 7,
    },
    editButton: {
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        borderWidth: 0.9,
        borderColor: "#D0D0D0",
    },
    removeButton: {
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        borderWidth: 0.9,
        borderColor: "#D0D0D0",
    },
    loginButton: {
        backgroundColor: "#28A745",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    loginButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },

});

export default styles;
