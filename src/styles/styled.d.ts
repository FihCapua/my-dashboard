// Esse tipo de arquivo obrescreve tipos de arquivos - uma tipagem disponivel pra aplicação inteira
import 'styled-components'; // Criando tipagens e atribuindo ao styled components - e essa tipagem fica disponivel dentro do styled components

// Definindo incluindo o objeto e suas caracteristicas - interface do objeto (objeto em si) é o Default Theme e seus tipos serão de strings

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string;

        colors: {
            primary: string;
            secondary: string;
            tertiary: string;

            white: string;
            black: string;
            gray: string;

            success: string;
            info: string;
            warning: string;
        };
    }
}
