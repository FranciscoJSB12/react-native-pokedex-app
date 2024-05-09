import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();

  //* Esta es la forma tradicional de una petición http
  // const {isLoading, data: pokemons = [] } = useQuery({
  //   queryKey: ['pokemons'],
  //   el queryKey es un identificador para el manejo de la información en caché, de esta forma si alguien hace una petición a pokemons, y en otro lugar se hace la misma petición con esa clave entonces tanstack va usar lo que tiene en caché y así se ahorra la petición
  //   queryFn: () => getPokemons(0),
  //   la queryFn es simplemente la función que usaremos para obtener la información
  //
  //   staleTime: 1000 * 60 * 60, // 60 minutes
  //   con el staleTime le decimos que es información que trajo es válida o está fresca por un intervalo de tiempo, en este caso 60 minutos
  // });

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    //initialPageParam indica que la página inicial va a ser cero
    staleTime: 1000 * 60 * 60, // 60 minutes
    queryFn: async params => {
      //pageParam te dice cual es la página en la que estás solicitando
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });

      return pokemons;
    },
    //El argumento page en la función getNextpageParam indica las páginas que tienes hasta el momento, esta función puede generar un error si queryFn está por debajo
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />

      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        ListHeaderComponent={() => <Text variant='displayMedium'>Pokédex</Text>}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
