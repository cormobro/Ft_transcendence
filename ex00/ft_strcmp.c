/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strcmp.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mdor <marvin@42.fr>                        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/09 14:34:06 by mdor              #+#    #+#             */
/*   Updated: 2022/08/25 16:24:04 by mdor             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>
#include <string.h>

int	ft_strcmp(char *s1, char *s2)
{
	int	i;

	i = 0;
	while (s2[i] == s1[i])
	{
		if (s2[i] == s1[i] && (s2[i + 1] == '\0' && s1[i + 1] == '\0'))
			return (0);
		i++;
	}
	return (s1[i] - s2[i]);
}

/*int main()
{
	char test1[] = "okla";
	char test2[] = "oalm";
	printf("%d\n", ft_strcmp(test1, test2));
	printf("%d", strcmp(test1, test2));
}*/
