/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fT_split2.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mdor <marvin@42.fr>                        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/25 09:19:38 by mdor              #+#    #+#             */
/*   Updated: 2022/08/25 16:49:19 by mdor             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>

int	ft_isep(char *str, char *charset)
{
	while (*charset)
	{
		if (*str == *charset++)
			return (1);
	}
	return (0);
}

int	ft_wordsize(char *str, char *charset)
{
	int	i;

	i = 0;
	while (str[i] && !ft_isep(str + i, charset))
		i++;
	return (i);
}

int	ft_nwords(char *str, char *charset)
{
	int	compteur;
	int	i;

	i = 0;
	compteur = 0;
	while (*str)
	{
		while (*str && ft_isep(str, charset))
			str++;
		i = ft_wordsize(str, charset);
		str += i;
		if (i != 0)
			compteur++;
	}
	return (compteur);
}

char	*ft_copy(char *tocop, int i)
{
	char	*copied;

	copied = (char *)malloc(sizeof(char) * (i + 1));
	while (i-- > 0)
	{
		copied[i] = tocop[i];
	}
	return (copied);
}

char	**ft_split(char *str, char *charset)
{
	char	**tabl;
	int		size;
	int		i;
	int		j;

	size = ft_nwords(str, charset);
	tabl = (char **)malloc((size + 1) * sizeof(char *));
	i = -1;
	while (++i < size)
	{
		while (*str && ft_isep(str, charset))
			str++;
		j = ft_wordsize(str, charset);
		tabl[i] = ft_copy(str, j);
		str = str + j;
	}
	tabl[i] = 0;
	return (tabl);
}

/*#include <stdio.h>
int    main()
{
    int        i;
    char    **split;;
    split = ft_split("l i said take this l lol", "l");
    i = 0;
    while (split[i])
    {
        printf("%s\n", split[i]);
        i++;
    }
}*/
