/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_swap.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mdor <marvin@42.fr>                        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/05 10:35:54 by mdor              #+#    #+#             */
/*   Updated: 2022/08/09 10:01:46 by mdor             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>

void	ft_swap(int *a, int *b)
{
	int	valeur1;
	int	valeur2;

	valeur1 = *a;
	valeur2 = *b;
	*a = valeur2;
	*b = valeur1;
}
/*int main ()
{
	int alph;
	int bet;
	alph = 20;
	bet = 15;
	printf("%d\n", alph);
	printf("%d\n", bet);
	ft_swap(&alph, &bet);
	printf("%d\n", alph);
	printf("%d\n", bet);
}*/
