# ATIVIDADE AVALIATIVA.py

import time

def exibir_menu():
    """Exibe o menu de opções para o usuário."""
    print("\n--- Gerador de Tabuada Interativo ---")
    print("1. Gerar a tabuada de um número específico")
    print("2. Gerar todas as tabuadas (de 1 a 10)")
    print("3. Sair")
    print("-------------------------------------")

def gerar_tabuada_numero():
    """Solicita um número ao usuário e gera sua tabuada."""
    tentativas = 0
    while tentativas < 3:
        try:
            numero = int(input("Digite o número para gerar a tabuada: "))
            print(f"\n--- Tabuada do {numero} ---")
            for i in range(1, 11):
                print(f"{numero} x {i} = {numero * i}")
            break # Sai do loop se a entrada for válida
        except ValueError:
            print("Entrada inválida. Por favor, digite um número inteiro.")
            tentativas += 1
            if tentativas == 3:
                print("Número máximo de tentativas excedido. Retornando ao menu principal.")
                time.sleep(2) # Pausa para o usuário ler a mensagem
                break

def gerar_todas_tabuadas():
    """Gera e exibe as tabuadas de 1 a 10."""
    print("\n--- Gerando Todas as Tabuadas (1 a 10) ---")
    for num_base in range(1, 11):
        print(f"\n--- Tabuada do {num_base} ---")
        for i in range(1, 11):
            print(f"{num_base} x {i} = {num_base * i}")
        time.sleep(0.5) # Pequena pausa entre as tabuadas para melhor visualização

def main():
    """Função principal do programa."""
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção: ")

        if opcao == '1':
            gerar_tabuada_numero()
        elif opcao == '2':
            gerar_todas_tabuadas()
        elif opcao == '3':
            print("Saindo do programa. Até mais!")
            break
        else:
            print("Opção inválida. Por favor, escolha uma opção entre 1 e 3.")
        time.sleep(1) # Pausa para o usuário ler as mensagens

if __name__ == "__main__":
    main()