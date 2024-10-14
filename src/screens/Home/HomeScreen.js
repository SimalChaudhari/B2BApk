import { Text, View, Image, TouchableOpacity, ScrollView, Pressable, TextInput, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from '../../assets/cssFile';
import { useNavigation } from "@react-navigation/native";
import Feather from '@expo/vector-icons/Feather';
import { fetchItems } from '../../BackendApis/itemsApi';
import { Dropdown } from 'react-native-element-dropdown'; // Importing the dropdown
import { formatNumber } from '../../utils';

const HomeScreen = () => {
  const [items, setItems] = useState([]); // Store the fetched items
  const [loading, setLoading] = useState(true); // Show a loading indicator
  const [error, setError] = useState(null); // Handle errors
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default number of items per page
  const [dropdownValue, setDropdownValue] = useState(4); // Initial dropdown value

  const options = [
    // { label: '1 items per page', value: 1 },
    { label: '4 items per page', value: 4 },
    { label: '10 items per page', value: 10 },
    { label: '20 items per page', value: 20 },
    { label: '30 items per page', value: 30 },
  ];

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await fetchItems(); // API call
        setItems(data); // Set the fetched items
        setLoading(false); // Stop loading indicator
      } catch (err) {
        setError('Failed to fetch items'); // Set error message
        setLoading(false);
      }
    };

    getItems(); // Call the async function
  }, []); // Only run once when the component mounts

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const totalPages = Math.ceil(items.data.length / itemsPerPage);
  const currentItems = items.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 1; // Show up to 5 pages
    const firstPage = 1;
    const lastPage = totalPages;
  
    // Determine the range of pages to show
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), firstPage);
    let endPage = Math.min(startPage + maxVisiblePages - 1, lastPage);
  
    // Adjust startPage if endPage is less than maxVisiblePages
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, firstPage);
    }
  
    // Render first page if not in the range
    if (startPage > firstPage) {
      pageNumbers.push(
        <TouchableOpacity key={firstPage} onPress={() => setCurrentPage(firstPage)} style={styles.pageNumber}>
          <Text style={styles.pageText}>{firstPage}</Text>
        </TouchableOpacity>
      );
    }
  
    // Add ellipsis before the range if needed
    if (startPage > firstPage + 1) {
      pageNumbers.push(<Text key="ellipsis-start"> ... </Text>);
    }
  
    // Render visible page numbers within the range
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <TouchableOpacity
          key={i}
          onPress={() => setCurrentPage(i)}
          style={[styles.pageNumber, currentPage === i && styles.activePage]}
        >
          <Text style={[styles.pageText, currentPage === i && styles.activePageText]}>{i}</Text>
        </TouchableOpacity>
      );
    }
  
    // Add ellipsis after the range if needed
    if (endPage < lastPage - 1) {
      pageNumbers.push(<Text key="ellipsis-end"> ... </Text>);
    }
  
    // Render last page if not in the range
    if (endPage < lastPage) {
      pageNumbers.push(
        <TouchableOpacity key={lastPage} onPress={() => setCurrentPage(lastPage)} style={styles.pageNumber}>
          <Text style={styles.pageText}>{lastPage}</Text>
        </TouchableOpacity>
      );
    }
  
    return pageNumbers;
  };
  

  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={styles.heroContainer}>
        <ScrollView>

          <Text style={styles.heroTopShop}>Shop</Text>
          <View style={styles.heroTopSearch}>
            <Pressable style={styles.heroPressable}>
              <Feather name="search" size={24} color="#ccc" />
              <TextInput
                placeholder='Search...'
                style={styles.searchInput}
                placeholderTextColor="#aaa" // Adjust placeholder color
              />
            </Pressable>
          </View>

          <View style={styles.heroFilter}>
            <Pressable style={styles.filterButton}>
              <Text style={styles.filterText}>Filters</Text>
              <Ionicons name="filter-sharp" size={24} color="black" />
            </Pressable>
            <Pressable style={styles.sortButton}>
              <Text style={styles.sortByText}>Sort by:</Text>
              <Text style={styles.sortText}> Featured</Text>
              <Feather name="chevron-down" size={24} color="black" />
            </Pressable>
          </View>

          {/* Dropdown to select items per page */}
          <View style={styles.dropdownContainer}>
            <Dropdown
              style={styles.DropdownStyle}
              data={options}
              labelField="label"
              valueField="value"
              placeholder="Select items per page"
              value={dropdownValue}
              onChange={item => {
                setDropdownValue(item.value);
                setItemsPerPage(item.value); // Update the number of items per page
                setCurrentPage(1); // Reset to the first page
              }}
              selectedTextStyle={styles.selectedText}
            />
          </View>

          {/* Display current items here (the deals) */}
          <View style={styles.heroTreanding}>
            {currentItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id
                  })
                }
                style={{
                  marginVertical: 10,
                  width: '47%',
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <View style={styles.heroProductView}>
                  <Image
                    style={styles.heroTopImage}
                    // source={{ uri: item.productImages[0] }}
                  />
                  <Text style={styles.heroProductTitle} numberOfLines={1}>
                    {item.itemName}
                  </Text>
                  <View style={styles.heroProductBottom}>
                    <Text style={{ marginLeft: 10 }}>₹ {formatNumber(item.sellingPrice)}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Pagination Controls */}
          <View style={styles.paginationControls}>
            <TouchableOpacity onPress={goToPreviousPage} disabled={currentPage === 1}>
              <Text style={styles.paginationArrow}><AntDesign name="left" size={18} color="black" /></Text>
            </TouchableOpacity>

            {renderPageNumbers()}

            <TouchableOpacity onPress={goToNextPage} disabled={currentPage === totalPages}>
              <Text style={styles.paginationArrow}><AntDesign name="right" size={18} color="black" /></Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
